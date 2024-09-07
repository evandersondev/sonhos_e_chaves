import { Header } from '@/components/header'
import { Suspense } from 'react'

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={<div />}>
      <Header />
      {children}
    </Suspense>
  )
}
