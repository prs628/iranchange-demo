import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email?: string
      phone?: string
      role: 'user' | 'admin'
    }
  }

  interface User {
    id: string
    name: string
    email?: string
    phone?: string
    role: 'user' | 'admin'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: 'user' | 'admin'
    phone?: string
  }
}



