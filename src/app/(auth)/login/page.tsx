'use client'

import { FC, useActionState } from 'react'
import Link from 'next/link'
import { ButtonWithLoading } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TRPCError } from '@trpc/server'
import { logInWithCredentials } from '../../_actions'

const Login: FC = () => {
    const [_, dispatch, isPending] = useActionState<
        TRPCError | undefined,
        FormData
    >(async (__, formData: FormData): Promise<TRPCError | undefined> => {
        try {
            await logInWithCredentials({
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
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your credentials to access your account
                </p>
            </div>
            <form className="space-y-4" action={dispatch}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
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
                    Login
                </ButtonWithLoading>
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
            </form>
        </>
    )
}

export default Login
