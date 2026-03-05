// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  // ── Protezione dashboard corso ──────────────────────────────────────
  // La dashboard richiede ?token= nell'URL. Se manca, redirect all'accesso.
  if (pathname.startsWith('/corso/dashboard')) {
    const token = request.nextUrl.searchParams.get('token')
    if (!token) {
      return NextResponse.redirect(new URL('/corso/accesso', request.url))
    }
  }

  // ── Cattura parametri UTM ────────────────────────────────────────────
  const utmSource   = request.nextUrl.searchParams.get('utm_source')
  const utmMedium   = request.nextUrl.searchParams.get('utm_medium')
  const utmCampaign = request.nextUrl.searchParams.get('utm_campaign')
  const utmTerm     = request.nextUrl.searchParams.get('utm_term')
  const utmContent  = request.nextUrl.searchParams.get('utm_content')

  if (utmSource || utmMedium || utmCampaign) {
    response.cookies.set('utm_data', JSON.stringify({
      utm_source:   utmSource,
      utm_medium:   utmMedium,
      utm_campaign: utmCampaign,
      utm_term:     utmTerm,
      utm_content:  utmContent,
      timestamp:    Date.now(),
    }), {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
