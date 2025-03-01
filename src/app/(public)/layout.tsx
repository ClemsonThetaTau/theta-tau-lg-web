import './public.css'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'

import NavBar from '@/components/public/nav/nav-bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clemson Theta Tau',
  description:
    "The official webpage of the Clemson University Lambda Gamma chapter of Theta Tau, the nation's oldest and largest professional engineering fraternity.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
      <GoogleAnalytics gaId="G-87T7K6GX57" />
    </html>
  )
}
