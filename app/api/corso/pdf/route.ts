// app/api/corso/pdf/route.ts
// Serve i PDF del corso solo a chi ha un token valido
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { readFile } from 'fs/promises'
import path from 'path'

// Mappa file consentiti — evita path traversal
const FILE_WHITELIST: Record<string, string> = {
  'indice':   'INDICE_CORSO_TORNO_IN_FORMA.pdf',
  'modulo1':  'MODULO_1_Motivazione_Mentalita.pdf',
  'modulo2':  'MODULO_2_Alimentazione.pdf',
  'modulo3':  'MODULO_3_Allenamento.pdf',
  'modulo4':  'MODULO_4_Sfida30Giorni.pdf',
  'modulo5':  'MODULO_5_Strumenti.pdf',
}

// Modulo richiesto -> numero minimo di giorni dall'acquisto
const MODULO_UNLOCK: Record<string, number> = {
  'indice':  0,
  'modulo1': 0,
  'modulo2': 7,
  'modulo3': 14,
  'modulo4': 21,
  'modulo5': 28,
}

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    const file  = req.nextUrl.searchParams.get('file')

    // 1. Parametri obbligatori
    if (!token || !file) {
      return new NextResponse('Parametri mancanti', { status: 400 })
    }

    // 2. File nella whitelist
    const filename = FILE_WHITELIST[file]
    if (!filename) {
      return new NextResponse('File non trovato', { status: 404 })
    }

    const supabase = createServerClient()

    // 3. Valida token
    const { data: sessione } = await supabase
      .from('corso_sessioni')
      .select('email, expires_at')
      .eq('token', token)
      .single()

    if (!sessione) {
      return new NextResponse('Accesso non autorizzato', { status: 401 })
    }

    if (new Date(sessione.expires_at) < new Date()) {
      return new NextResponse('Sessione scaduta. Richiedi un nuovo link di accesso.', { status: 401 })
    }

    // 4. Verifica acquisto e calcola moduli sbloccati
    const { data: acquisto } = await supabase
      .from('corso_acquisti')
      .select('acquistato_at, stato')
      .eq('email', sessione.email)
      .eq('stato', 'completato')
      .single()

    if (!acquisto) {
      return new NextResponse('Nessun acquisto valido', { status: 403 })
    }

    // 5. Controlla se il modulo richiesto è sbloccato
    const giorniPassati = Math.floor(
      (Date.now() - new Date(acquisto.acquistato_at).getTime()) / (1000 * 60 * 60 * 24)
    )
    const giorniNecessari = MODULO_UNLOCK[file]

    if (giorniPassati < giorniNecessari) {
      const giorniMancanti = giorniNecessari - giorniPassati
      return new NextResponse(
        `Questo modulo si sblocca tra ${giorniMancanti} giorni`,
        { status: 403 }
      )
    }

    // 6. Leggi e servi il PDF dalla cartella private (fuori da public/)
    const pdfPath = path.join(process.cwd(), 'private', 'corso', filename)

    let pdfBuffer: Buffer
    try {
      pdfBuffer = await readFile(pdfPath)
    } catch {
      console.error(`PDF non trovato: ${pdfPath}`)
      return new NextResponse('File non disponibile', { status: 404 })
    }

    // 7. Restituisci il PDF con header download
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'private, no-cache',
      },
    })

  } catch (err) {
    console.error('Errore PDF route:', err)
    return new NextResponse('Errore interno', { status: 500 })
  }
}