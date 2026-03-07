// app/api/corso/progresso/route.ts
// E:\tornoinforma-landing\app\api\corso\progresso\route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

// POST — salva lezione completata
export async function POST(req: NextRequest) {
  try {
    const { token, lezioneNum } = await req.json()

    if (!token || !lezioneNum) {
      return NextResponse.json({ ok: false, error: 'Dati mancanti' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Valida token
    const { data: sessione } = await supabase
      .from('corso_sessioni')
      .select('email, expires_at')
      .eq('token', token)
      .single()

    if (!sessione || new Date(sessione.expires_at) < new Date()) {
      return NextResponse.json({ ok: false, error: 'Token non valido' }, { status: 401 })
    }

    const moduloNum = parseInt(lezioneNum.split('.')[0])

    // Upsert progresso lezione
    const { error } = await supabase
      .from('corso_progressi_lezioni')
      .upsert({
        email: sessione.email,
        lezione_num: lezioneNum,
        modulo_num: moduloNum,
        completata_at: new Date().toISOString(),
      }, { onConflict: 'email,lezione_num' })

    if (error) {
      console.error('Errore salvataggio progresso:', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('Errore progresso POST:', err)
    return NextResponse.json({ ok: false, error: 'Errore interno' }, { status: 500 })
  }
}

// GET — recupera progressi utente
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    if (!token) return NextResponse.json({ ok: false, error: 'Token mancante' }, { status: 400 })

    const supabase = createServerClient()

    const { data: sessione } = await supabase
      .from('corso_sessioni')
      .select('email, expires_at')
      .eq('token', token)
      .single()

    if (!sessione || new Date(sessione.expires_at) < new Date()) {
      return NextResponse.json({ ok: false, error: 'Token non valido' }, { status: 401 })
    }

    const { data: progressi } = await supabase
      .from('corso_progressi_lezioni')
      .select('lezione_num, completata_at')
      .eq('email', sessione.email)

    const lezioniCompletate = (progressi || []).map(p => p.lezione_num)

    return NextResponse.json({ ok: true, lezioniCompletate })

  } catch (err) {
    console.error('Errore progresso GET:', err)
    return NextResponse.json({ ok: false, error: 'Errore interno' }, { status: 500 })
  }
}
