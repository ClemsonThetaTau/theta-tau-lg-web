'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { db, storage } from '@/firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

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

import { BrotherCommandItem, BrotherCombobox } from './brother-combobox'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'

const positionsFormSchema = z.object({
  regent: z.string({
    required_error: "Please select a regent.",
  }),
  viceRegent: z.string({
    required_error: "Please select a vice regent.",
  }),
  scribe: z.string({
    required_error: "Please select a scribe.",
  }),
  treasurer: z.string({
    required_error: "Please select a treasurer.",
  }),
  delegateAtLarge: z.string({
    required_error: "Please select a delegate at large.",
  }),
  correspondingSecretary: z.string({
    required_error: "Please select a corresponding secretary.",
  }),
  newMemberEducator: z.string({
    required_error: "Please select a new member educator.",
  }),
})

type PositionsFormValues = z.infer<typeof positionsFormSchema>

const defaultValues: Partial<PositionsFormValues> = {
  regent: '',
  viceRegent: '',
  scribe: '',
  treasurer: '',
  delegateAtLarge: '',
  correspondingSecretary: '',
  newMemberEducator: '',
}

export function PositionsForm({defaultValues, brothers}: {defaultValues: Partial<PositionsFormValues>, brothers: BrotherCommandItem[]}) {
  const { push } = useRouter()
  const [profilePicture, setProfilePicture] = useState('')

  const form = useForm<PositionsFormValues>({
    resolver: zodResolver(positionsFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onSubmit(data: PositionsFormValues) {
    const { regent, viceRegent, scribe, treasurer, delegateAtLarge, correspondingSecretary, newMemberEducator } = data

    const userRef = doc(db, 'public', 'officers')
    const officersData = {
      ec: {
        regent: regent,
        viceRegent: viceRegent,
        scribe: scribe,
        treasurer: treasurer,
        delegateAtLarge: delegateAtLarge,
        correspondingSecretary: correspondingSecretary,
        newMemberEducator: newMemberEducator,
      }
    }

    setDoc(userRef, officersData, { merge: true })
      .then(() => {
        toast({
          title: 'Form Submission:',
          description: 'Positions updated successfully',
        })
      })
      .catch((error) => {
        console.error('Error updating positions', error)
        toast({
          title: 'Form Submission:',
          description: 'Error updating positions, make sure you\'re the web chair!',
        })
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name="regent"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Regent</FormLabel>
                <FormControl>
                  <BrotherCombobox form={form} field={field} brothers={brothers} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="viceRegent"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Vice Regent</FormLabel>
                <FormControl>
                  <BrotherCombobox form={form} field={field} brothers={brothers} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scribe"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Scribe</FormLabel>
                <FormControl>
                  <BrotherCombobox form={form} field={field} brothers={brothers} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="treasurer"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Treasurer</FormLabel>
                <FormControl>
                  <BrotherCombobox form={form} field={field} brothers={brothers} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="delegateAtLarge"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Delegate at Large</FormLabel>
                <FormControl>
                  <BrotherCombobox form={form} field={field} brothers={brothers} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correspondingSecretary"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Corresponding Secretary</FormLabel>
                <FormControl>
                  <BrotherCombobox form={form} field={field} brothers={brothers} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newMemberEducator"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>New Member Educator</FormLabel>
                <FormControl>
                  <BrotherCombobox form={form} field={field} brothers={brothers} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Update Positions</Button>
      </form>
    </Form>
  )
}
