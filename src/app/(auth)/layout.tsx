import { FC, ReactNode } from 'react'

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="flex h-full">
                <div className="m-auto max-w-sm space-y-6">{children}</div>
            </div>
            {/* to display image later */}
            <div className="hidden md:block" />
        </div>
    )
}

export default AuthLayout
