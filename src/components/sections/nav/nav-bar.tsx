import React from 'react'
import Image from 'next/image'

import { Separator } from '@/components/ui/separator'
import { NavItem } from './nav-item'

export default function NavBar() {
  return (
    <nav className="fixed z-50 top-0 w-full">
      <div className="w-full flex items-center justify-center flex-wrap bg-background/50 p-4 backdrop-filter backdrop-blur-md">
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
