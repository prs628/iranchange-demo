import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(
  name: string,
  email: string | null,
  phone: string | null,
  password: string,
  role: 'user' | 'admin' = 'user'
) {
  const passwordHash = await hashPassword(password)
  
  return prisma.user.create({
    data: {
      name,
      email: email || null,
      phone: phone || null,
      passwordHash,
      role,
    },
  })
}

export async function findUserByEmailOrPhone(
  emailOrPhone: string
) {
  const isEmail = emailOrPhone.includes('@')
  
  if (isEmail) {
    return prisma.user.findUnique({
      where: { email: emailOrPhone },
    })
  } else {
    return prisma.user.findFirst({
      where: { phone: emailOrPhone },
    })
  }
}

export async function validateEmail(email: string): Promise<boolean> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function validatePhone(phone: string): Promise<boolean> {
  // Basic phone validation - adjust based on your requirements
  const phoneRegex = /^[0-9]{10,15}$/
  return phoneRegex.test(phone.replace(/\s+/g, ''))
}

export async function validatePassword(password: string): Promise<{ valid: boolean; error?: string }> {
  if (password.length < 8) {
    return { valid: false, error: 'رمز عبور باید حداقل 8 کاراکتر باشد' }
  }
  if (password.length > 128) {
    return { valid: false, error: 'رمز عبور نباید بیشتر از 128 کاراکتر باشد' }
  }
  return { valid: true }
}



