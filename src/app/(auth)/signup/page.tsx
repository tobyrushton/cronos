'use client'

import { signUpWithCredentials } from '@/app/_actions'
import { ButtonWithLoading } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TRPCError } from '@trpc/server'
import Link from 'next/link'
import { FC, useActionState } from 'react'

const SignUp: FC = () => {
    const [_, dispatch, isPending] = useActionState<
        TRPCError | undefined,
        FormData
    >(async (__, formData: FormData): Promise<TRPCError | undefined> => {
        try {
            await signUpWithCredentials({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
            })
        } catch (e) {
            return e as TRPCError
        }
        return undefined
    }, undefined)

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
                <ButtonWithLoading
                    type="submit"
                    className="w-full"
                    loading={isPending}
                >
                    Sign Up
                </ButtonWithLoading>
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
