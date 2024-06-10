'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const Login: FC = () => {
    return (
        <div className="m-auto max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your credentials to access your account
                </p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <div className="flex justify-between text-sm">
                    <Link
                        href="/reset"
                        className="underline underline-offset-2"
                    >
                        Forgot Password?
                    </Link>
                    <Link
                        href="/signup"
                        className="underline underline-offset-2"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
