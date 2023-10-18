import './cmt.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import NavBar from '@/components/nav/nav-bar'
import { Toaster } from '@/components/ui/toaster'

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
        <main>
        {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
