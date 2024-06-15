'use server'

import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { lucia } from '@/server/auth/lucia'
import { Argon2id } from 'oslo/password'
import { cookies } from 'next/headers'
import { client } from '@/server/db/client'
import { publicAction, redirect } from '@/server/trpc'

export const logInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const signUpSchema = logInSchema.extend({
    name: z.string().max(255),
})

/*
    temporary fix to allow useActionState to work with trpc
    from https://github.com/juliusmarminge/trellix-trpc/blob/94d8febef4ddb35cd823e99c6722258e3e9c65b2/src/app/_actions.ts
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MakeAction<T> = T extends (...args: any[]) => Promise<infer U>
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state: any, fd: FormData) => Promise<U>
    : never

export const logInWithCredentials = publicAction
    .input(logInSchema)
    .query(async ({ input }) => {
        const user = await client.user.findUnique({
            where: {
                email: input.email,
            },
        })

        if (!user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Invalid email or password',
            })
        }

        const validPassword = await new Argon2id().verify(
            user.hashedPassword,
            input.password
        )

        if (!validPassword) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Invalid email or password',
            })
        }

        const session = await lucia.createSession(user.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )

        return redirect('/calendar')
    })

export const signUpWithCredentials = publicAction
    .input(signUpSchema)
    .mutation(async ({ input }) => {
        const hashedPassword = await new Argon2id().hash(input.password)

        const user = await client.user.create({
            data: {
                email: input.email,
                name: input.name,
                hashedPassword,
            },
        })

        const session = await lucia.createSession(user.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )

        return redirect('/calendar')
    })
