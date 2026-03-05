// app/corso/accesso/page.tsx
'use client'

import { useState } from 'react'
import { Mail, Loader, CheckCircle } from 'lucide-react'

export default function AccessoPage() {
  const [email, setEmail] = useState('')
  const [stato, setStato] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setStato('loading')

    try {
      const res = await fetch('/api/corso/accesso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.ok) {
        setStato('sent')
      } else {
        setStato('error')
        setMsg(data.error || 'Email non trovata tra gli acquirenti del corso.')
      }
    } catch {
      setStato('error')
      setMsg('Errore di rete. Riprova.')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* Logo */}
      <a href="/" className="mb-10">
        <img src="/logo.svg" alt="Torno in Forma" className="h-10" />
      </a>

      <div className="w-full max-w-sm">

        {stato !== 'sent' ? (
          <>
            <div className="text-center mb-8">
              <h1 className="font-heading text-2xl font-black mb-2">Accedi al Corso</h1>
              <p className="text-gray-400 text-sm">
                Inserisci la tua email. Ti inviamo un link di accesso diretto.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="La tua email di acquisto"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              {stato === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                  {msg}
                  <p className="mt-1 text-red-500/70 text-xs">
                    Non hai ancora il corso?{' '}
                    <a href="/corso" className="underline text-red-400">Acquistalo qui</a>
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={stato === 'loading'}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {stato === 'loading'
                  ? <><Loader size={16} className="animate-spin" /> Invio in corso...</>
                  : 'Invia link di accesso'
                }
              </button>
            </form>

            <p className="text-center text-gray-600 text-xs mt-6">
              Hai appena acquistato?{' '}
              <a href="/corso" className="text-gray-400 hover:text-white underline">Torna alla pagina corso</a>
            </p>
          </>
        ) : (
          <div className="text-center">
            <CheckCircle size={56} className="text-green-400 mx-auto mb-6" />
            <h2 className="font-heading text-2xl font-black mb-3">Email inviata!</h2>
            <p className="text-gray-400 text-sm mb-4">
              Abbiamo inviato il link di accesso a:
            </p>
            <div className="bg-white/10 rounded-lg px-4 py-3 text-primary font-semibold text-sm mb-6 break-all">
              {email}
            </div>
            <p className="text-gray-500 text-xs">
              Controlla anche la cartella spam.
              Il link scade dopo 24 ore.
            </p>
            <button
              onClick={() => { setStato('idle'); setEmail('') }}
              className="mt-6 text-gray-500 text-sm hover:text-gray-400 underline transition-colors">
              Usa un&apos;altra email
            </button>
          </div>
        )}

      </div>
    </main>
  )
}
