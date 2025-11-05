'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAuth } from '@/lib/auth-context'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/data-entry/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/forms/form'

import { BrotherCommandItem, BrotherCombobox } from './brother-combobox'

import { Input } from '@/components/ui/data-entry/input'
import { toast } from '@/components/ui/feedback/use-toast'
import { Label } from '@/components/ui/forms/label'
import { MinusCircle } from 'lucide-react'

const positionsFormSchema = z.object({
  regent: z.string({
    required_error: 'Please select a regent.',
  }),
  viceRegent: z.string({
    required_error: 'Please select a vice regent.',
  }),
  scribe: z.string({
    required_error: 'Please select a scribe.',
  }),
  treasurer: z.string({
    required_error: 'Please select a treasurer.',
  }),
  delegateAtLarge: z.string({
    required_error: 'Please select a delegate at large.',
  }),
  correspondingSecretary: z.string({
    required_error: 'Please select a corresponding secretary.',
  }),
  newMemberEducator: z.string({
    required_error: 'Please select a new member educator.',
  }),
  chairs: z.array(
    z.object({
      value: z.string({ required_error: 'Please enter a brother.' }),
    })
  ),
  chairTitles: z.array(
    z.object({
      value: z.string({ required_error: 'Please enter a position title.' }),
    })
  ),
})

export type PositionsFormValues = z.infer<typeof positionsFormSchema>

export function PositionsForm({
  defaultValues,
  brothers,
}: {
  defaultValues: Partial<PositionsFormValues>
  brothers: BrotherCommandItem[]
}) {
  const { push } = useRouter()
  const [profilePicture, setProfilePicture] = useState('')

  const form = useForm<PositionsFormValues>({
    resolver: zodResolver(positionsFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  async function onSubmit(data: PositionsFormValues) {
    const {
      regent,
      viceRegent,
      scribe,
      treasurer,
      delegateAtLarge,
      correspondingSecretary,
      newMemberEducator,
      chairs,
      chairTitles,
    } = data

    try {
      // First, fetch all existing officers to update or delete
      const officersResponse = await fetch('/api/officers')
      const existingOfficers = await officersResponse.json()

      // Deactivate all existing officers
      for (const officer of existingOfficers.docs) {
        await fetch(`/api/officers/${officer.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ isActive: false }),
        })
      }

      // Create or update EC positions
      const ecPositions = [
        { ecPosition: 'regent', user: regent, positionName: 'Regent', type: 'ec' },
        { ecPosition: 'viceRegent', user: viceRegent, positionName: 'Vice Regent', type: 'ec' },
        { ecPosition: 'scribe', user: scribe, positionName: 'Scribe', type: 'ec' },
        { ecPosition: 'treasurer', user: treasurer, positionName: 'Treasurer', type: 'ec' },
        { ecPosition: 'delegateAtLarge', user: delegateAtLarge, positionName: 'Delegate at Large', type: 'ec' },
        { ecPosition: 'correspondingSecretary', user: correspondingSecretary, positionName: 'Corresponding Secretary', type: 'ec' },
        { ecPosition: 'newMemberEducator', user: newMemberEducator, positionName: 'New Member Educator', type: 'ec' },
      ]

      for (const position of ecPositions) {
        await fetch('/api/officers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            ...position,
            isActive: true,
            displayOrder: 0,
          }),
        })
      }

      // Create chair positions
      if (chairs && chairTitles) {
        for (let i = 0; i < chairs.length; i++) {
          await fetch('/api/officers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              user: chairs[i].value,
              positionName: chairTitles[i].value,
              type: 'chair',
              isActive: true,
              displayOrder: i + 1,
            }),
          })
        }
      }

      toast({
        title: 'Success',
        description: 'Positions updated successfully',
      })
    } catch (error) {
      console.error('Error updating positions', error)
      toast({
        title: 'Error',
        description: "Error updating positions, make sure you're the web chair!",
      })
    }
  }

  const chairFieldArray = useFieldArray({
    name: 'chairs',
    control: form.control,
  })

  const chairTitlesFieldArray = useFieldArray({
    name: 'chairTitles',
    control: form.control,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="regent"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Regent</FormLabel>
                <FormControl>
                  <BrotherCombobox
                    form={form}
                    field={field}
                    brothers={brothers}
                  />
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
                  <BrotherCombobox
                    form={form}
                    field={field}
                    brothers={brothers}
                  />
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
                  <BrotherCombobox
                    form={form}
                    field={field}
                    brothers={brothers}
                  />
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
                  <BrotherCombobox
                    form={form}
                    field={field}
                    brothers={brothers}
                  />
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
                  <BrotherCombobox
                    form={form}
                    field={field}
                    brothers={brothers}
                  />
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
                  <BrotherCombobox
                    form={form}
                    field={field}
                    brothers={brothers}
                  />
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
                  <BrotherCombobox
                    form={form}
                    field={field}
                    brothers={brothers}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          {chairFieldArray.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-x-1 gap-y-2 w-full"
              style={{
                marginTop: '8px',
                gridTemplateAreas: window.innerWidth < 768 ?  '"a c" "b b"' : '"a b c"',
                gridTemplateColumns: "1fr 2fr 40px",
              }}
            >
            <div style={{gridArea: 'a'}}>
              <FormField
                control={form.control}
                key={field.id}
                name={`chairs.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      Chairs
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Add chairs and their names
                    </FormDescription>
                    <FormControl>
                      <BrotherCombobox
                        form={form}
                        field={field}
                        brothers={brothers}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

              <div className="p-0 mb-0 mt-auto" style={{gridArea: 'b'}}>
                <FormField
                  control={form.control}
                  key={chairTitlesFieldArray.fields[index].id}
                  name={`chairTitles.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Position Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                className="p-0 mb-0 mt-auto"
                style={{gridArea: 'c'}}
                onClick={() => {
                  chairFieldArray.remove(index)
                  chairTitlesFieldArray.remove(index)
                }}
              >
                <MinusCircle className="h-5 w-5" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              chairFieldArray.append({ value: '' })
              chairTitlesFieldArray.append({ value: '' })
            }}
          >
            Add Chair
          </Button>
        </div>
        <Button type="submit">Update Positions</Button>
      </form>
    </Form>
  )
}
