'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db, storage } from '@/firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

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
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'

import { ProfilePicture } from './profile-picture'

const profileFormSchema = z.object({
  profilePicture: z.string().optional(),
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
    .string()
    .email()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm({
  defaultValues,
  profilePicture
}: {
  defaultValues: Partial<ProfileFormValues>,
  profilePicture: string
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onSubmit(data: ProfileFormValues) {
    const { firstName, lastName, displayEmail } = data

    const uid = auth.currentUser?.uid

    if (!uid) {
      return
    }

    const userRef = doc(db, 'users', uid)
    const userData = {
      firstName,
      lastName,
      displayEmail,
      profilePicture,
    }

    setDoc(userRef, userData, { merge: true })
      .then(() => {
        toast({
          title: 'You submitted the following values:',
          description: 'Profile updated successfully',
        })
      })
      .catch((error) => {
        console.error('Error updating profile', error)
        toast({
          title: 'You submitted the following values:',
          description: 'Error updating profile',
        })
      })
  }

  return (
    <Form {...form}>
      <Image className="w-32" src={profilePicture} alt="Profile Picture" width={128} height={128}/>
      <ProfilePicture url={profilePicture} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }: { field: any }) => (
              <FormItem>
                <div className='flex'>
                <img alt="Profile Picture" src={profilePicture} width={200} height={200} />
                </div>
                <FormControl>
                <Input type='file' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
                  <Input
                    autoComplete="given-name"
                    placeholder="First"
                    {...field}
                  />
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
                  <Input
                    autoComplete="family-name"
                    placeholder="Last"
                    {...field}
                  />
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
