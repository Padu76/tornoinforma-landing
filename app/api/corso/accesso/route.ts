// app/api/corso/accesso/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import crypto from 'crypto'

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

async function sendMagicLink(email: string, token: string) {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/corso/dashboard?token=${token}`

  await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_CORSO_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        to_email: email,
        to_name: '',
        dashboard_url: dashboardUrl,
        subject: 'Il tuo link di accesso al corso',
      },
    }),
  })
}

// POST — richiesta magic link
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Email non valida' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Verifica che l'email abbia acquistato
    const { data: acquisto } = await supabase
      .from('corso_acquisti')
      .select('email, nome')
      .eq('email', email.toLowerCase())
      .eq('stato', 'completato')
      .single()

    if (!acquisto) {
      return NextResponse.json({
        ok: false,
        error: 'Nessun acquisto trovato per questa email.',
      }, { status: 404 })
    }

    // Genera nuovo token
    const token = generateToken()
    await supabase.from('corso_sessioni').insert({
      email: email.toLowerCase(),
      token,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })

    // Invia email
    await sendMagicLink(email.toLowerCase(), token)

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('Errore accesso POST:', err)
    return NextResponse.json({ ok: false, error: 'Errore interno' }, { status: 500 })
  }
}

// GET — valida token e restituisce sessione
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')

    if (!token) {
      return NextResponse.json({ ok: false, error: 'Token mancante' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Cerca il token
    const { data: sessione } = await supabase
      .from('corso_sessioni')
      .select('email, usato, expires_at')
      .eq('token', token)
      .single()

    if (!sessione) {
      return NextResponse.json({ ok: false, error: 'Link non valido.' }, { status: 404 })
    }

    if (new Date(sessione.expires_at) < new Date()) {
      return NextResponse.json({ ok: false, error: 'Link scaduto. Richiedine uno nuovo.' }, { status: 401 })
    }

    // Marca token come usato (ma non lo invalida — utente può restare loggato)
    await supabase.from('corso_sessioni').update({ usato: true }).eq('token', token)

    // Recupera dati acquisto
    const { data: acquisto } = await supabase
      .from('corso_acquisti')
      .select('email, nome, acquistato_at')
      .eq('email', sessione.email)
      .single()

    if (!acquisto) {
      return NextResponse.json({ ok: false, error: 'Acquisto non trovato.' }, { status: 404 })
    }

    return NextResponse.json({
      ok: true,
      sessione: {
        email: acquisto.email,
        nome: acquisto.nome,
        acquistato_at: acquisto.acquistato_at,
      },
    })

  } catch (err) {
    console.error('Errore accesso GET:', err)
    return NextResponse.json({ ok: false, error: 'Errore interno' }, { status: 500 })
  }
}
