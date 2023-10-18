import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { UserAuthForm } from './user-auth-form'
import { GiGearHammer } from 'react-icons/gi'

export default function Login() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <GiGearHammer />
          &nbsp;Theta Tau ΛΓ
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Whatsoever thy hand findeth to do, do it with thy
              might.&rdquo;
            </p>
            <footer className="text-sm">Ecclesiastes 9:10</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 h-full">
        <div className="mx-auto flex w-full flex-col justify-center h-full space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your personal email below to login
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/forgot-password"
              className="underline underline-offset-4 hover:text-primary"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
