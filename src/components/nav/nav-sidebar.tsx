'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { buttonVariants } from '@/components/ui/button'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// Defining the types for the props
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  sections: {
    title: string
    items: {
      href?: string
      title: string
      subItems?: {
        href: string
        title: string
      }[]
    }[]
  }[]
}

// The SidebarNav component with sections and their items
export function SidebarNav({ className, sections, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <div className={`pb-12 ${className}`}>
      <nav
        className={cn(
          'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
          className
        )}
        {...props}
      >
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="grid grid-flow-col gap-x-2 lg:grid-flow-row lg:gap-x-0 lg:gap-y-1">
                {section.items.map((item) => {
                  if (!item.subItems) {
                    return (
                      <Link
                        key={item.href ?? item.title}
                        href={item.href ?? '#'}
                        className={cn(
                          buttonVariants({ variant: 'ghost' }),
                          pathname === item.href
                            ? 'bg-muted hover:bg-muted'
                            : 'hover:bg-transparent hover:underline',
                          'justify-start'
                        )}
                      >
                        {item.title}
                      </Link>
                    )
                  } else {
                    return (
                      <Accordion
                        key={item.href ?? item.title}
                        type="single"
                        className={cn(
                        'rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                        'px-4 hover:bg-accent hover:text-accent-foreground',
                          pathname === item.href
                            ? 'bg-muted hover:bg-muted'
                            : 'hover:bg-transparent hover:underline',
                          'justify-start',
                        )}
                        collapsible
                      >
                        <AccordionItem value="item-1" className={cn('border-b-0', 'relative')}>
                          <AccordionTrigger>{item.title}</AccordionTrigger>
                          <AccordionContent>
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={cn(
                                  buttonVariants({ variant: 'ghost' }),
                                  pathname === subItem.href
                                    ? 'bg-muted hover:bg-muted'
                                    : 'hover:bg-transparent hover:underline',
                                  'justify-start'
                                )}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}
