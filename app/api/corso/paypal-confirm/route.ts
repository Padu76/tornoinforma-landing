// app/api/corso/paypal-confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import crypto from 'crypto'

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

async function sendAccessEmail(email: string, nome: string, token: string) {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/corso/dashboard?token=${token}`
  const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'andrea.padoan@gmail.com'

  const html = `<!DOCTYPE html>
<html>
<body style="background:#111111;color:#ffffff;font-family:sans-serif;padding:40px 20px;margin:0;">
  <div style="max-width:520px;margin:0 auto;">
    <div style="margin-bottom:32px;">
      <span style="font-size:22px;font-weight:900;color:#E8450A;">Torno in Forma</span>
    </div>
    <h1 style="font-size:24px;font-weight:900;margin-bottom:8px;">
      Ciao${nome ? ` ${nome}` : ''}! Il tuo accesso e pronto 🎉
    </h1>
    <p style="color:#aaaaaa;font-size:15px;line-height:1.6;margin-bottom:28px;">
      Acquisto confermato. Clicca il pulsante per accedere al tuo corso.<br/>
      Il <strong style="color:#ffffff;">Modulo 1</strong> e disponibile subito.<br/>
      I moduli successivi si sbloccano ogni 7 giorni automaticamente.
    </p>
    <a href="${dashboardUrl}" style="display:inline-block;background:#E8450A;color:#ffffff;padding:16px 36px;border-radius:12px;font-weight:700;font-size:16px;text-decoration:none;margin-bottom:28px;">
      Accedi al Corso →
    </a>
    <p style="color:#555555;font-size:12px;line-height:1.6;">
      Il link e valido per 24 ore. Dopo puoi richiederne uno nuovo su tornoinforma.it/corso/accesso<br/><br/>
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
      subject: '🔓 Il tuo accesso al Corso Torno in Forma',
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend error: ${err}`)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, nome, paypalOrderId } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Email non valida' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error: acquErr } = await supabase
      .from('corso_acquisti')
      .upsert({
        email: email.toLowerCase(),
        nome: nome || null,
        paypal_order_id: paypalOrderId,
      }, { onConflict: 'email' })

    if (acquErr && acquErr.code !== '23505') {
      console.error('Errore salvataggio acquisto:', acquErr)
      return NextResponse.json({ ok: false, error: acquErr.message }, { status: 500 })
    }

    const token = generateToken()
    const { error: tokErr } = await supabase
      .from('corso_sessioni')
      .insert({
        email: email.toLowerCase(),
        token,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })

    if (tokErr) {
      console.error('Errore generazione token:', tokErr)
      return NextResponse.json({ ok: false, error: tokErr.message }, { status: 500 })
    }

    await sendAccessEmail(email.toLowerCase(), nome || '', token)

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('Errore paypal-confirm:', err)
    return NextResponse.json({ ok: false, error: 'Errore interno' }, { status: 500 })
  }
}
