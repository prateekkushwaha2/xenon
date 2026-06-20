import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'XENON Luxury Store',
  description:
    'Luxury Jewellery & Cosmetics'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body  suppressHydrationWarning
        className="
        min-h-full
        flex
        flex-col
        bg-black
        text-white
        relative
        overflow-x-hidden
        "
      >
        {/* Razorpay Script */}
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>

        {/* Global Glow Top */}
        <div
          className="
          fixed
          top-[-200px]
          left-[-200px]
          w-[500px]
          h-[500px]
          bg-[#d4af37]/10
          blur-3xl
          rounded-full
          pointer-events-none
          z-0
          "
        />

        {/* Global Glow Bottom */}
        <div
          className="
          fixed
          bottom-[-200px]
          right-[-200px]
          w-[500px]
          h-[500px]
          bg-[#d4af37]/10
          blur-3xl
          rounded-full
          pointer-events-none
          z-0
          "
        />

        {/* Toasts */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111',
              color: '#fff',
              border:
                '1px solid rgba(212,175,55,0.3)'
            }
          }}
        />

        {/* Global Cart Provider */}
        <CartProvider>
          <div className="relative z-10">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  )
}