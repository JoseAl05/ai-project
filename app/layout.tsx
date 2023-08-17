import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import ModalProvider from '@/components/modal/ModalProvider'
import ToastProvider from '@/components/toaster/ToastProvider'
import CrispProvider from '@/components/crisp/CrispProvider'
import { Suspense } from 'react'
import LoadingPage from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aetherial',
  description: 'AI Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          <Suspense fallback={<LoadingPage />}>
            {children}
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  )
}
