import { initTRPC, TRPCError } from '@trpc/server'
import { experimental_nextAppDirCaller } from '@trpc/server/adapters/next-app-dir'
import { validateRequest } from './auth/validateRequest'

export { experimental_redirect as redirect } from '@trpc/server/adapters/next-app-dir'

interface Meta {
    span: string
}

export const t = initTRPC.meta<Meta>().create()

const serverActionProcedure = t.procedure
    .experimental_caller(
        experimental_nextAppDirCaller({
            pathExtractor: ({ meta }) => (meta as Meta).span,
        })
    )
    .use(async opts => {
        const { user, session } = await validateRequest()
        return opts.next({ ctx: { user, session } })
    })

export const publicAction = serverActionProcedure
export const protectedAction = serverActionProcedure.use(opts => {
    if (!opts.ctx.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
        })
    }

    return opts.next({
        ctx: {
            ...opts.ctx,
            user: opts.ctx.user,
            session: opts.ctx.session,
        },
    })
})
