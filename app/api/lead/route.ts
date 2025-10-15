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

    const { data, error } = await supabase
      .from('leads')
      .insert([payload])
      .select()

    if (error) {
      // Se l'errore è di email duplicata, restituisci successo comunque
      if (error.code === '23505' && error.message.includes('duplicate key')) {
        console.log('Email already exists, returning success:', payload.email)
        return NextResponse.json({ 
          ok: true, 
          message: 'Thank you! We have your information.', 
          duplicate: true 
        })
      }
      
      // Altri errori Supabase
      console.error('Supabase error:', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    console.log('Lead saved successfully:', data)
    return NextResponse.json({ 
      ok: true, 
      message: 'Lead saved successfully', 
      data,
      duplicate: false 
    })
    
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}