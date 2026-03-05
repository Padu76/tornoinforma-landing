// app/api/corso/paypal-confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import crypto from 'crypto'

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

async function sendAccessEmail(email: string, nome: string, token: string) {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/corso/dashboard?token=${token}`

  // Usa EmailJS (gia configurato nel progetto) o nodemailer
  // Qui usiamo fetch diretto all'API EmailJS
  const templateParams = {
    to_email: email,
    to_name: nome || 'Studente',
    dashboard_url: dashboardUrl,
    subject: 'Il tuo accesso al Corso Torno in Forma',
  }

  // EmailJS
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_CORSO_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`EmailJS error: ${text}`)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, nome, paypalOrderId } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Email non valida' }, { status: 400 })
    }

    const supabase = createServerClient()

    // 1. Salva acquisto (ignora se duplicato — doppio click)
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

    // 2. Genera token accesso
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

    // 3. Invia email con link
    await sendAccessEmail(email, nome || '', token)

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('Errore paypal-confirm:', err)
    return NextResponse.json({ ok: false, error: 'Errore interno' }, { status: 500 })
  }
}
