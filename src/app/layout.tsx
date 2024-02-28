import Header from '@/components/root/header/Header'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Acme',
  description:
    'Explore a variety of job opportunities with Acme. Find the perfect job that suits your skills and interests. Discover a range of positions in different industries and start your career journey today.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}  bg-gradient-to-br from-dark to-[rgb(12,1,17)] min-h-screen text-white relative`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
