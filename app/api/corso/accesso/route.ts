// app/api/corso/accesso/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import crypto from 'crypto'

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

async function sendMagicLink(email: string, token: string) {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/corso/dashboard?token=${token}`
  const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'andrea.padoan@gmail.com'

  const html = `<!DOCTYPE html>
<html>
<body style="background:#111111;color:#ffffff;font-family:sans-serif;padding:40px 20px;margin:0;">
  <div style="max-width:520px;margin:0 auto;">
    <div style="margin-bottom:32px;">
      <span style="font-size:22px;font-weight:900;color:#E8450A;">Torno in Forma</span>
    </div>
    <h1 style="font-size:24px;font-weight:900;margin-bottom:8px;">Il tuo link di accesso</h1>
    <p style="color:#aaaaaa;font-size:15px;line-height:1.6;margin-bottom:28px;">
      Clicca il pulsante per accedere alla tua area corso.<br/>
      Il link e valido per <strong style="color:#ffffff;">24 ore</strong>.
    </p>
    <a href="${dashboardUrl}" style="display:inline-block;background:#E8450A;color:#ffffff;padding:16px 36px;border-radius:12px;font-weight:700;font-size:16px;text-decoration:none;margin-bottom:28px;">
      Accedi al Corso →
    </a>
    <p style="color:#555555;font-size:12px;line-height:1.6;">
      <a href="${dashboardUrl}" style="color:#E8450A;word-break:break-all;">${dashboardUrl}</a>
    </p>
    <hr style="border:none;border-top:1px solid #333333;margin:28px 0;"/>
    <p style="color:#444444;font-size:11px;">Torno in Forma — tornoinforma.it</p>
  </div>
</body>
</html>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Torno in Forma <${FROM_EMAIL}>`,
      to: [email],
      subject: '🔑 Link di accesso al tuo corso',
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend error: ${err}`)
  }
}

// POST — richiesta magic link
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Email non valida' }, { status: 400 })
    }

    const supabase = createServerClient()

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

    const token = generateToken()
    await supabase.from('corso_sessioni').insert({
      email: email.toLowerCase(),
      token,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })

    await sendMagicLink(email.toLowerCase(), token)

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('Errore accesso POST:', err)
    return NextResponse.json({ ok: false, error: 'Errore interno' }, { status: 500 })
  }
}

// GET — valida token
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')

    if (!token) {
      return NextResponse.json({ ok: false, error: 'Token mancante' }, { status: 400 })
    }

    const supabase = createServerClient()

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

    await supabase.from('corso_sessioni').update({ usato: true }).eq('token', token)

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
