'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import { db } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { signIn } from '@/firebase/auth'

import { cn } from '@/lib/utils'
import { ImSpinner3 } from 'react-icons/im'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast()
  const { push } = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const form = event.target as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value

    let { result, error } = await signIn(email, password)
    console.log(result)
    console.log(error)

    if (error != null) {
      setIsLoading(false)
      toast({
        title: 'Error Logging In: ',
        description: error.message,
      })
    } else {
      push('/settings')
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 mb-4">
            <div className="relative flex text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Email
              </span>
            </div>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <div className="relative flex text-xs uppercase mt-2">
              <span className="bg-background px-2 text-muted-foreground">
                Password
              </span>
            </div>
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder=""
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  )
}
