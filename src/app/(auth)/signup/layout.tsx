import { FC, ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign Up - Cronos',
    description: 'Sign up for Cronos today for free!',
}

const SignUpLayout: FC<{ children: ReactNode }> = ({ children }) => (
    <>{children}</>
)

export default SignUpLayout
