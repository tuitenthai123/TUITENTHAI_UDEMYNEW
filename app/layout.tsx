import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {ClerkProvider} from "@clerk/nextjs"
import ContextProvider from '@/context/context'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vlute Udemy',
  description: 'TuiTenThai Create this ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <ClerkProvider>
      <ContextProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ContextProvider>
    </ClerkProvider>

  )
}
