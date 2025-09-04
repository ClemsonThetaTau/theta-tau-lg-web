'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { BiLogIn, BiMenu } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'

import { Separator } from '@/components/ui/data-display/separator'
import { NavItem } from './nav-item'

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About Us',
      href: '/about-us',
    },
    {
      label: 'Officers & Chairs',
      href: '/officers-chairs',
    },
    {
      label: 'Brothers',
      href: '/brothers',
    },
    // {
    //   label: 'Rush',
    //   href: '/rush',
    // },
  ]
  
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
        <div className="text-base mr-16 lg:block hidden">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.label}
            </NavItem>
          ))}
        </div>
        <a className="hover:text-accent-foreground transition-colors" href='/login'>
          <BiLogIn className="h-6 w-6"/>
        </a>
        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <BiMenu className="h-6 w-6 ml-4"/>
        </button>
      </div>
      <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex flex-col items-center mb-8 lg:hidden"
                  >
                    {navItems.map((item) => (
                      <NavItem key={item.href} href={item.href}>
                        {item.label}
                      </NavItem>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
      <Separator className="w-full bg-gray-200" />
    </nav>
  )
}