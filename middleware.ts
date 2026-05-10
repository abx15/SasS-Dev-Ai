import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/pricing(.*)', '/features(.*)', '/about(.*)', '/services(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const isDev = process.env.NODE_ENV === 'development';
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (!isPublicRoute(request) && !(isDev && isDashboard)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
