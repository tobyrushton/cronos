'use client'

import { MakeAction, signUpWithCredentials } from '@/app/_actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { FC, useActionState } from 'react'

const SignUp: FC = () => {
    const [_, dispatch] = useActionState(
        signUpWithCredentials as MakeAction<typeof signUpWithCredentials>,
        undefined
    )

    return (
        <>
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Get Started Today</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your details to create an account
                </p>
            </div>
            <form className="space-y-2" action={dispatch}>
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
                <Link
                    href="/login"
                    className="text-sm justify-center flex w-full underline underline-offset-2"
                >
                    Already have an account? Login
                </Link>
            </form>
        </>
    )
}

export default SignUp
