'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, verifyBeforeUpdateEmail, updatePassword } from 'firebase/auth'
import { db } from '@/firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
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
import { ComboboxForm } from '@/components/ui/form-combobox'
import { toast } from '@/components/ui/use-toast'

const emailFormSchema = z.object({
  newEmail: z
    .string()
    .email({ message: 'Invalid email address.' })
    .min(5, { message: 'Email must be at least 5 characters.' }),
  currentPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
})

const passwordFormSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  currentPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
})

const profileFormSchema = z.object({
  gradYear: z
    .string(),
  major: z
    .string()
    .min(2, { message: 'Major must be at least 2 characters.' }),
  status: z.enum(['active', 'inactive'], { message: 'Select "active" or "inactive".' }),
})

type EmailFormValues = z.infer<typeof emailFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>
type ProfileFormValues = z.infer<typeof profileFormSchema>

export function AccountForm() {
  const { push } = useRouter()
  const [badgeNumber, setBadgeNumber] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { newEmail: '', currentPassword: '' },
    mode: 'onChange',
  })

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { newPassword: '', currentPassword: '' },
    mode: 'onChange',
  })

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { gradYear: '', major: '', status: 'active' },
    mode: 'onChange',
  })

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid
        const userData = await getDoc(doc(db, 'users', uid))

        if (userData.exists()) {
          const data = userData.data()

          setBadgeNumber(data.badgeNumber)

          profileForm.reset({
            gradYear: data.gradYear,
            major: data.major,
            status: data.status,
          })
        }
      } else {
        push('/login')
      }
    })
  }, [])

  const handleEmailUpdate = async (data: EmailFormValues) => {
    const { newEmail, currentPassword } = data;
    const user = auth.currentUser;
    
    if (user && user.email) {
      try {
        await signInWithEmailAndPassword(auth, user.email, currentPassword);
      } catch (error) {
        console.error('Error in re-authentication:', error);
        toast({ title: 'Reauthentication failed' });
        return;
      }
  
      try {
        await verifyBeforeUpdateEmail(user, newEmail, { url: `http://${window.location.hostname}/verify-email` });
        toast({
          title: 'Verification email sent',
          description: 'Please check your new email for a verification link.',
        });
      } catch (error) {
        console.error('Error sending verification email', error);
        toast({ title: 'Error sending verification email' });
      }
    } else {
      toast({ title: 'No user is logged in' });
    }
  };


  const handlePasswordUpdate = async (data: PasswordFormValues) => {
    const { newPassword, currentPassword } = data
    const user = auth.currentUser

    if (user && user.email) {
      try {
        console.log("Passing", user.email, currentPassword)
        const userCredential = await signInWithEmailAndPassword(auth, user.email, currentPassword);
        console.log(userCredential)
        console.log("USER CREDENTIAL RECIEVED")
        await updatePassword(userCredential.user, newPassword)
        toast({ title: 'Password updated successfully' })
      } catch (error) {
        console.error('Error updating password', error)
        toast({ title: 'Error updating password' })
      }
    }
  }

  const handleProfileUpdate = async (data: ProfileFormValues) => {
    const { gradYear, major, status } = data
    const user = auth.currentUser

    if (!user) {
      return
    }

    const uid = user.uid
    const userRef = doc(db, 'users', uid)
    const userData = { gradYear, major, status }

    try {
      await setDoc(userRef, userData, { merge: true })
      toast({ title: 'Profile updated successfully' })
    } catch (error) {
      console.error('Error updating profile', error)
      toast({ title: 'Error updating profile' })
    }
  }

  return (
    <>
      <Form {...emailForm}>
        <form onSubmit={emailForm.handleSubmit(handleEmailUpdate)} className="space-y-8">
          <FormField
            control={emailForm.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Email</FormLabel>
                <FormControl>
                  <Input autoComplete="email" placeholder="newemail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={emailForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="current-password" placeholder="Current password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Email</Button>
        </form>
      </Form>

      <Separator />

      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-8">
          <FormField
            control={passwordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" placeholder="New password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="current-password" placeholder="Current password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Password</Button>
        </form>
      </Form>

      <Separator />

      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-8">
          <FormLabel>Badge Number: {badgeNumber}</FormLabel>

          <FormField
            control={profileForm.control}
            name="gradYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Graduation Year</FormLabel>
                <FormControl>
                  <Input placeholder="2023" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <br></br>
                <FormControl>
                  <ComboboxForm
                    form={profileForm}
                    field={field}
                      name="status"
                      label="Status"
                      options={[
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" },
                      ]}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Profile</Button>
        </form>
      </Form>
    </>
  )
}

// Large portions of this were chat gpted, god I love technology
// Started to use "Continue" pretty cool little vscode extension, basically github copilot
// but I can work offline with a local llm so if I got no internet its no problem
// also can use gpt 4o which just came out and is so ungodly cracked at coding
// we're not gonna have any jobs in a couple years...