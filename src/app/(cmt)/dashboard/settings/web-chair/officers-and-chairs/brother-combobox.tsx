'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { FormControl } from '@/components/ui/form'
import Brothers from '@/app/(public)/brothers/page'

export interface BrotherCommandItem {
  value: string
  label: string
}

// This is supposed to be more of a temporary fix than a permanent one,
// though it will probably become a permanent one. Ideally we should rewrite all the forms
// components as they're atrocious to work with alongside firebase.


// This takes in the form objects in order to place the correct forms objects inside the
// component while still having them reference the form that it's placed into, it's a
// terribly bloated and un component like system
export function BrotherCombobox({
  form,
  field,
  brothers,
}: {
  form: any
  field: any
  brothers: BrotherCommandItem[]
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-[200px] justify-between',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value
              ? brothers.find((brother) => brother.value === field.value)?.label
              : 'Select brother'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search brother..." />
          <CommandEmpty>No brother found.</CommandEmpty>
          <CommandGroup>
            {brothers.map((brother) => (
              <CommandItem
                value={brother.label}
                key={brother.value}
                onSelect={() => {
                  form.setValue(field.name, brother.value)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    brother.value === field.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {brother.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
