import { NextResponse } from 'next/server'
import { createUser, validateEmail, validatePhone, validatePassword } from '@/lib/auth-server'
import { findUserByEmailOrPhone } from '@/lib/auth-server'

// Simple rate limiting (in-memory, for production use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 }) // 15 minutes
    return true
  }
  
  if (limit.count >= 5) { // Max 5 registrations per 15 minutes
    return false
  }
  
  limit.count++
  return true
}

export async function POST(request: Request) {
  try {
    // Get client IP (simplified - in production use proper IP detection)
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'تعداد درخواست‌ها بیش از حد مجاز است. لطفاً بعداً تلاش کنید.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, password } = body

    // Validate inputs
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'نام باید حداقل 2 کاراکتر باشد' },
        { status: 400 }
      )
    }

    if (!email && !phone) {
      return NextResponse.json(
        { success: false, error: 'لطفاً ایمیل یا شماره تلفن را وارد کنید' },
        { status: 400 }
      )
    }

    if (email && !(await validateEmail(email))) {
      return NextResponse.json(
        { success: false, error: 'فرمت ایمیل نامعتبر است' },
        { status: 400 }
      )
    }

    if (phone && !(await validatePhone(phone))) {
      return NextResponse.json(
        { success: false, error: 'فرمت شماره تلفن نامعتبر است' },
        { status: 400 }
      )
    }

    const passwordValidation = await validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, error: passwordValidation.error },
        { status: 400 }
      )
    }

    // Check if user already exists
    const identifier = email || phone
    if (!identifier) {
      return NextResponse.json(
        { success: false, error: 'لطفاً ایمیل یا شماره تلفن را وارد کنید' },
        { status: 400 }
      )
    }

    const existingUser = await findUserByEmailOrPhone(identifier)
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'این ایمیل یا شماره تلفن قبلاً ثبت شده است' },
        { status: 409 }
      )
    }

    // Create user
    const user = await createUser(
      name.trim(),
      email?.trim() || null,
      phone?.trim() || null,
      password,
      'user'
    )

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'خطا در ثبت نام. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    )
  }
}

