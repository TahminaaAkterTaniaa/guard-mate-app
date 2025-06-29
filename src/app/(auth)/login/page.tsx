//  /guard-mate-app/src/app/(auth)/login/page.tsx

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import OpenEyeIcon from '../../../../public/icons/OpenEyeIcon'
import CloseEyeSlashIcon from '../../../../public/icons/CloseEyeSlashIcon'
import { Button } from '@/components/ui/Button'

// Form schema validation
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      console.log('Attempting login with:', data.email)
      
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/home',
      })

      console.log('SignIn result:', result)

      if (result?.error) {
        console.error('Login error:', result.error)
        setError(`Login failed: ${result.error}`)
        setIsLoading(false)
        return
      }

      // Redirect to home on successful login
      console.log('Login successful, redirecting to /home')
      router.push('/home')
    } catch (err) {
      console.error('Login exception:', err)
      setError(`An error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-primary flex h-screen w-full items-center justify-center p-0 m-0">
      <div className="w-full max-w-[430px] h-full flex flex-col justify-center px-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative h-[200px] w-[300px]">
            <Image src="/images/logo.png" alt="GuardMate Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-white">Welcome back!</h1>
          <p className="text-white/80">Login to your account</p>
        </div>

        {error && (
          <div className="mx-4 mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form className="space-y-6 px-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-white">
              Your email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full border-b border-white/50 bg-transparent px-0 py-2 text-white placeholder-white/50 focus:border-white focus:outline-none"
                placeholder="tim.jennings@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm text-white">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="w-full border-b border-white/50 bg-transparent px-0 py-2 pr-8 text-white placeholder-white/50 focus:border-white focus:outline-none"
                placeholder="**********"
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <CloseEyeSlashIcon /> : <OpenEyeIcon />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-300">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 rounded-full border-white/30 bg-transparent text-black focus:ring-primary focus:ring-offset-0"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-white">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-white hover:text-white/80">
              Forgot Password ?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            variant="whitePrimary"
            size="lg"
            className="mt-8 w-full rounded-xl text-primary shadow-md"
            isLoading={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </Button>
        </form>
      </div>
    </div>
  )
}
