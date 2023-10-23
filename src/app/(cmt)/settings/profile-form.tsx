'use client'

import React, { useEffect, useState } from 'react'

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Label } from "@/components/ui/label"
import Image from 'next/image'

const profileFormSchema = z.object({
  profilePicture: z.string(),
  firstName: z
    .string()
    .min(2, {
      message: 'Display Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Display Name must not be longer than 30 characters.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Display Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Display Name must not be longer than 30 characters.',
    }),
  displayEmail: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { push } = useRouter()
  const [profilePicture, setProfilePicture] = useState('')

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
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

        if (userData.exists()) {
          console.log('Document data:', userData.data())
          const data = userData.data()

          setProfilePicture(data.profilePicture)
          const defaultValues: Partial<ProfileFormValues> = {
            firstName: data.firstName,
            lastName: data.lastName,
            displayEmail: data.displayEmail,
          }

          form.reset(defaultValues)
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
            name="profilePicture"
            render={({ field }: { field: any }) => (
              <FormItem>
                <div className='flex'>
                <Image alt="Profile Picture" src={profilePicture} width={200} height={200} />
                </div>
                <FormControl>
                <Input type='file' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormLabel style={{ marginTop: '32px' }}>Display Name</FormLabel>
        <div
          className="grid grid-cols-1 gap-x-4 gap-y-2 w-full md:grid-cols-2"
          style={{ marginTop: '8px' }}
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormControl>
                  <Input autocomplete="given-name" placeholder="First" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormControl>
                  <Input autocomplete="family-name" placeholder="Last" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormDescription style={{ marginTop: '8px' }}>
          This is your public name. It can be your real name or a pseudonym.
        </FormDescription>
        <FormField
          control={form.control}
          name="displayEmail"
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
