// app/corso/successo/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Loader } from 'lucide-react'
import { Suspense } from 'react'

function SuccessoContent() {
  const params = useSearchParams()
  const email = params.get('email') || ''
  const nome = params.get('nome') || ''
  const paypalOrderId = params.get('tx') || params.get('token') || `manual_${Date.now()}`

  const [stato, setStato] = useState<'loading' | 'ok' | 'error'>('loading')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!email) {
      setStato('error')
      setMsg('Email non trovata. Contattaci a info@tornoinforma.it')
      return
    }

    fetch('/api/corso/paypal-confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, nome, paypalOrderId }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          setStato('ok')
        } else {
          setStato('error')
          setMsg(data.error || 'Errore imprevisto')
        }
      })
      .catch(() => {
        setStato('error')
        setMsg('Errore di rete. Contattaci a info@tornoinforma.it')
      })
  }, [email, nome, paypalOrderId])

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">

        {stato === 'loading' && (
          <>
            <Loader size={48} className="text-primary animate-spin mx-auto mb-6" />
            <h1 className="font-heading text-2xl font-black mb-3">Elaborazione acquisto...</h1>
            <p className="text-gray-400">Un momento, stiamo attivando il tuo accesso.</p>
          </>
        )}

        {stato === 'ok' && (
          <>
            <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
            <h1 className="font-heading text-3xl font-black mb-4">
              Benvenuto{nome ? `, ${nome}` : ''}!
            </h1>
            <p className="text-gray-300 mb-4">
              Acquisto confermato. Abbiamo inviato un link di accesso a:
            </p>
            <div className="bg-white/10 rounded-lg px-4 py-3 text-primary font-semibold mb-6 break-all">
              {email}
            </div>
            <p className="text-gray-400 text-sm mb-8">
              Controlla la tua casella email (anche la cartella spam).
              Il link e valido per 24 ore.
            </p>
            <a href="/corso/accesso"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors">
              Vai all&apos;accesso
            </a>
            <p className="text-gray-600 text-xs mt-6">
              Problemi? Scrivici a info@tornoinforma.it
            </p>
          </>
        )}

        {stato === 'error' && (
          <>
            <div className="text-5xl mb-6">⚠️</div>
            <h1 className="font-heading text-2xl font-black mb-4">Qualcosa non ha funzionato</h1>
            <p className="text-gray-400 mb-6">{msg}</p>
            <p className="text-gray-500 text-sm">
              Se hai completato il pagamento, contattaci subito a{' '}
              <a href="mailto:info@tornoinforma.it" className="text-primary underline">
                info@tornoinforma.it
              </a>{' '}
              con la ricevuta PayPal e attiviamo il tuo accesso manualmente.
            </p>
          </>
        )}

      </div>
    </main>
  )
}

export default function SuccessoPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <Loader size={48} className="text-primary animate-spin" />
      </main>
    }>
      <SuccessoContent />
    </Suspense>
  )
}
