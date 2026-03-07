// app/api/corso/audio/route.ts
// E:\tornoinforma-landing\app\api\corso\audio\route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { LEZIONI_SLIDES } from '@/lib/lezione-slides'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY!
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID!
const BUCKET = 'corso-audio'

// GET /api/corso/audio?token=...&lezione=1.1&slide=1
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    const lezioneNum = req.nextUrl.searchParams.get('lezione')
    const slideId = req.nextUrl.searchParams.get('slide')

    if (!token || !lezioneNum || !slideId) {
      return NextResponse.json({ ok: false, error: 'Parametri mancanti' }, { status: 400 })
    }

    // Valida token
    const supabase = createServerClient()
    const { data: sessione } = await supabase
      .from('corso_sessioni')
      .select('email, expires_at')
      .eq('token', token)
      .single()

    if (!sessione || new Date(sessione.expires_at) < new Date()) {
      return NextResponse.json({ ok: false, error: 'Token non valido' }, { status: 401 })
    }

    // Trova testo narrazione
    const lezione = LEZIONI_SLIDES[lezioneNum]
    if (!lezione) {
      return NextResponse.json({ ok: false, error: 'Lezione non trovata' }, { status: 404 })
    }

    const slide = lezione.slides.find(s => s.id === parseInt(slideId))
    if (!slide) {
      return NextResponse.json({ ok: false, error: 'Slide non trovata' }, { status: 404 })
    }

    // Path file in Supabase Storage
    const storagePath = `${lezioneNum.replace('.', '-')}/${slideId}.mp3`

    // 1. Controlla se l'audio è già in cache (Supabase Storage)
    const { data: existing } = await supabase.storage
      .from(BUCKET)
      .list(lezioneNum.replace('.', '-'), {
        search: `${slideId}.mp3`,
      })

    if (existing && existing.length > 0) {
      // Restituisce URL pubblico diretto
      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(storagePath)

      return NextResponse.json({ ok: true, url: urlData.publicUrl, cached: true })
    }

    // 2. Genera audio con ElevenLabs
    const elevenRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: slide.narrazio,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.2,
            use_speaker_boost: true,
          },
        }),
      }
    )

    if (!elevenRes.ok) {
      const err = await elevenRes.text()
      console.error('ElevenLabs error:', err)
      return NextResponse.json({ ok: false, error: 'Errore generazione audio' }, { status: 500 })
    }

    const audioBuffer = await elevenRes.arrayBuffer()

    // 3. Salva in Supabase Storage per cache futura
    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: false,
      })

    if (uploadErr && uploadErr.message !== 'The resource already exists') {
      console.error('Upload error:', uploadErr)
      // Non bloccare — restituisci l'audio direttamente
      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=86400',
        },
      })
    }

    // 4. Restituisce URL pubblico del file appena caricato
    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath)

    return NextResponse.json({ ok: true, url: urlData.publicUrl, cached: false })

  } catch (err) {
    console.error('Errore audio route:', err)
    return NextResponse.json({ ok: false, error: 'Errore interno' }, { status: 500 })
  }
}
