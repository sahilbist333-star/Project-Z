import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl

    // Protected app routes — require authentication
    const isAppRoute = pathname.startsWith('/dashboard') ||
        pathname.startsWith('/analysis') ||
        pathname.startsWith('/account')

    // Redirect unauthenticated users away from app routes
    if (!user && isAppRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    // Redirect authenticated users away from auth pages
    if (user && (pathname === '/sign-in' || pathname === '/sign-up')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        // Protected app routes
        '/dashboard/:path*',
        '/analysis/:path*',
        '/account/:path*',
        // Auth pages (to redirect logged-in users away)
        '/sign-in',
        '/sign-up',
        '/forgot-password',
    ],
}
