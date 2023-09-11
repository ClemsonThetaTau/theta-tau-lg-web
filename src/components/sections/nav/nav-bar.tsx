import React from 'react'
import Image from 'next/image'

import { Separator } from '@/components/ui/separator'
import { NavItem } from './nav-item'

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/50 backdrop-filter backdrop-blur-md">
      <div className="w-full flex items-center justify-center flex-wrap p-4">
        <div className="flex items-center flex-shrink-0 mr-12">
          <Image
            src="/images/logo-2.png"
            alt="Theta Tau Lambda Gamma Second Logo"
            width={120}
            height={120}
          />
        </div>
        <div className="text-base mr-16">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/about-us">About Us</NavItem>
          <NavItem href="/officers-chairs">Officers & Chairs</NavItem>
          <NavItem href="/brothers">Brothers</NavItem>
          <NavItem href="/rush">Rush</NavItem>
        </div>
      </div>
      <Separator className="w-full bg-gray-200" />
    </nav>
  )
}
