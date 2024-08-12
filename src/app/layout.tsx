import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'm-todo',
  description: 'A simple todo app built with Next.js and localStorage',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' font-mono'}>{children}</body>
      <script defer src="https://cloud.umami.is/script.js" data-website-id="29328871-573e-42b5-92d2-fd8d306d9a4d"></script>
    </html>
  )
}
