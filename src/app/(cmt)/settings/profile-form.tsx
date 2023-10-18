'use client'

import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Display Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Display Name must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  username: '',
  email: '',
}

export function ProfileForm() {
  const { push } = useRouter()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid
        const userData = await getDoc(doc(db, 'users', uid))
        console.log('RUNNING USERDATA STUFF')
        console.log('UID: ', uid)

        if (userData.exists()) {
          console.log('Document data:', userData.data())
          const data = userData.data()

          const { username, email } = data
          console.log('username: ', username, email)

          form.reset(data)
        }
      } else {
        push('/login')
      }
    })
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName lastName"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="First" {...field} />
                <Input placeholder="Last" {...field} />
              </FormControl>
              <FormDescription>
                This is your public name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Display Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@clemson.edu" {...field} />
              </FormControl>
              <FormDescription>
                This email will be displayed on the &quot;brothers&quot; portion
                of the website.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
