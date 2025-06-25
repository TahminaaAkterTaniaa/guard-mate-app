import { hash, compare } from 'bcryptjs'

/**
 * Hash a password string using bcryptjs
 * @param password The plain text password to hash
 * @returns A promise that resolves to the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

/**
 * Verify if a plain text password matches a hashed password
 * @param password The plain text password to verify
 * @param hashedPassword The hashed password to compare against
 * @returns A promise that resolves to a boolean indicating if the password matches
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}

/**
 * Generate a random password reset token
 * @returns A random string token
 */
export function generateResetToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Generate a random 6-digit verification code
 * @returns A 6-digit string code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
