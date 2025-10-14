// app/api/lead/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const payload = {
      email: body.email?.toLowerCase(),
      first_name: body.first_name || null,
      phone: body.phone || null,
      source: body.source || 'website',
      utm: body.utm || {},
      created_at: new Date().toISOString()
    }

    if (!payload.email || !payload.email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify([payload])
    })

    if (!res.ok) {
      const txt = await res.text()
      console.error('Supabase error:', txt)
      return NextResponse.json({ ok: false, error: txt }, { status: 500 })
    }

    // TODO: Send email with book preview (Resend/Brevo)
    
    return NextResponse.json({ ok: true, message: 'Lead saved successfully' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
