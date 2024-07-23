import { FC, ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Log In - Cronos',
    description: 'Log back in to Cronos!',
}

const LogInLayout: FC<{ children: ReactNode }> = ({ children }) => (
    <>{children}</>
)

export default LogInLayout
