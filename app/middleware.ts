import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Capture UTM parameters
  const utmSource = request.nextUrl.searchParams.get('utm_source')
  const utmMedium = request.nextUrl.searchParams.get('utm_medium')
  const utmCampaign = request.nextUrl.searchParams.get('utm_campaign')
  const utmTerm = request.nextUrl.searchParams.get('utm_term')
  const utmContent = request.nextUrl.searchParams.get('utm_content')
  
  if (utmSource || utmMedium || utmCampaign) {
    const utmData = {
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
      timestamp: Date.now()
    }
    
    response.cookies.set('utm_data', JSON.stringify(utmData), {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: false,
      sameSite: 'lax'
    })
  }
  
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
