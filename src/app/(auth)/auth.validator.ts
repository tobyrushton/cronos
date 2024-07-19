import { z } from 'zod'

export const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
})

export const signUpSchema = logInSchema.extend({
    name: z.string().max(255),
})
