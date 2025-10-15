import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const payload = {
      email: body.email?.toLowerCase(),
      first_name: body.first_name || null,
      phone: body.phone || null,
      source: body.source || 'website',
      utm: body.utm || {}
    }

    if (!payload.email || !payload.email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
    }

    // Salva su Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([payload])
      .select()

    let isNewLead = true

    if (error) {
      // Se l'errore è di email duplicata, continua comunque con l'invio email
      if (error.code === '23505' && error.message.includes('duplicate key')) {
        console.log('Email already exists:', payload.email)
        isNewLead = false
      } else {
        // Altri errori Supabase
        console.error('Supabase error:', error)
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
      }
    } else {
      console.log('Lead saved successfully:', data)
    }

    // Invia email tramite EmailJS
    try {
      const emailData = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: {
          user_email: payload.email,
          user_name: payload.first_name || 'Caro/a',
          to_email: payload.email
        }
      }

      const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      })

      if (emailResponse.ok) {
        console.log('Email sent successfully to:', payload.email)
      } else {
        console.error('EmailJS error:', emailResponse.status, await emailResponse.text())
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Non bloccare la response per errori email
    }

    return NextResponse.json({ 
      ok: true, 
      message: isNewLead ? 'Lead saved and email sent' : 'Email sent to existing lead',
      duplicate: !isNewLead 
    })
    
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}