import './cmt.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import NavBar from '@/components/sections/nav/nav-bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clemson Theta Tau CMT',
  description:
    "The In-House Chapter Management Tool for the Theta Tau Lambda Gamma Chapter.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
