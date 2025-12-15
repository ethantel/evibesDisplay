'use client'

import { useEffect } from 'react'
import { Amplify } from 'aws-amplify'
import { ThemeProvider } from 'next-themes'
import config from '@/aws-exports'

// Configure Amplify with your AWS credentials
Amplify.configure(config)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
