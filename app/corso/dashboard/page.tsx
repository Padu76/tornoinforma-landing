// app/corso/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Lock, Download, CheckCircle, Clock, ChevronDown, ChevronUp, LogOut, BookOpen } from 'lucide-react'
import { MODULI, getModuliSbloccati, getGiorniAlProssimoModulo } from '@/lib/corso-data'
import { Suspense } from 'react'

interface SessioneInfo {
  email: string
  nome: string | null
  acquistato_at: string
}

function DashboardContent() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token')

  const [sessione, setSessione] = useState<SessioneInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [moduloAperto, setModuloAperto] = useState<number | null>(1)

  useEffect(() => {
    if (!token) {
      router.replace('/corso/accesso')
      return
    }

    // Valida il token
    fetch(`/api/corso/accesso?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          setSessione(data.sessione)
          // Salva token in sessionStorage per navigazione
          sessionStorage.setItem('corso_token', token)
        } else {
          setError(data.error || 'Link scaduto o non valido.')
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Errore di rete.')
        setLoading(false)
      })
  }, [token, router])

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Verifica accesso...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-6">🔒</div>
        <h1 className="font-heading text-2xl font-black text-white mb-4">Link non valido</h1>
        <p className="text-gray-400 text-sm mb-6">{error}</p>
        <a href="/corso/accesso"
          className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors text-sm">
          Richiedi nuovo link
        </a>
      </div>
    </div>
  )

  if (!sessione) return null

  const sbloccati = getModuliSbloccati(sessione.acquistato_at)
  const totaleCompletati = sbloccati.length
  const progresso = Math.round((totaleCompletati / 5) * 100)

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* NAVBAR */}
      <nav className="bg-black border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Torno in Forma" className="h-7" />
          <span className="text-gray-500 text-sm hidden sm:block">/ Corso Completo</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm hidden sm:block">{sessione.email}</span>
          <a href="/corso/accesso" className="flex items-center gap-1.5 text-gray-500 hover:text-white text-sm transition-colors">
            <LogOut size={14} /> Esci
          </a>
        </div>
      </nav>

      {/* HEADER BENVENUTO */}
      <div className="bg-black border-b border-white/10 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-2xl font-black mb-1">
            Ciao{sessione.nome ? `, ${sessione.nome}` : ''}! 👋
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Il tuo percorso Torno in Forma — acquistato il {new Date(sessione.acquistato_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          {/* Progress bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white/10 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progresso}%` }}
              />
            </div>
            <span className="text-sm text-gray-400 whitespace-nowrap">
              {totaleCompletati}/5 moduli sbloccati
            </span>
          </div>
        </div>
      </div>

      {/* MODULI */}
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">

        {/* Link indice PDF */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={20} className="text-primary" />
            <div>
              <p className="font-semibold text-sm">Indice del Corso</p>
              <p className="text-gray-500 text-xs">Descrizione completa di tutte le 20 lezioni</p>
            </div>
          </div>
          <a
            href="/corso/pdf/INDICE_CORSO_TORNO_IN_FORMA.pdf"
            download
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            <Download size={14} /> Scarica
          </a>
        </div>

        {MODULI.map((mod) => {
          const sbloccato = sbloccati.includes(mod.num)
          const giorniMancanti = sbloccato ? 0 : getGiorniAlProssimoModulo(sessione.acquistato_at, mod.num)
          const aperto = moduloAperto === mod.num

          return (
            <div key={mod.num}
              className={`rounded-xl border overflow-hidden transition-all ${sbloccato ? 'border-white/20 bg-white/5' : 'border-white/10 bg-white/2 opacity-70'}`}>

              {/* Header modulo */}
              <button
                onClick={() => sbloccato && setModuloAperto(aperto ? null : mod.num)}
                className={`w-full text-left p-5 flex items-center gap-4 ${sbloccato ? 'hover:bg-white/5 cursor-pointer' : 'cursor-default'} transition-colors`}>

                {/* Badge numero */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${sbloccato ? 'bg-primary text-white' : 'bg-white/10 text-gray-500'}`}>
                  {sbloccato ? mod.num : <Lock size={14} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">Modulo {mod.num}</span>
                    {sbloccato && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Disponibile</span>}
                    {!sbloccato && <span className="text-xs bg-white/10 text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1"><Clock size={10} /> {giorniMancanti} giorni</span>}
                  </div>
                  <h3 className="font-heading font-bold text-base leading-tight">{mod.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{mod.subtitle} • {mod.lessons.length} lezioni</p>
                </div>

                {sbloccato && (
                  <div className="shrink-0 text-gray-500">
                    {aperto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                )}
              </button>

              {/* Lezioni espandibili */}
              {sbloccato && aperto && (
                <div className="border-t border-white/10">
                  {/* Download PDF modulo */}
                  <div className="px-5 py-4 bg-primary/10 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-primary">PDF Modulo {mod.num}</p>
                      <p className="text-xs text-gray-400">Contiene tutte le lezioni e i worksheet del modulo</p>
                    </div>
                    <a
                      href={`/corso/pdf/${mod.lessons[0].pdfFile}`}
                      download
                      className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      <Download size={14} /> Scarica PDF
                    </a>
                  </div>

                  {/* Lista lezioni */}
                  <div className="divide-y divide-white/5">
                    {mod.lessons.map((lezione, i) => (
                      <div key={lezione.num} className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-semibold text-sm">{lezione.title}</span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock size={10} /> {lezione.duration}
                              </span>
                            </div>
                            <p className="text-gray-400 text-xs leading-relaxed mb-3">{lezione.desc}</p>

                            <div className="grid sm:grid-cols-2 gap-2 text-xs">
                              <div>
                                <p className="text-gray-600 font-semibold mb-1">Cosa imparerai</p>
                                <ul className="space-y-0.5">
                                  {lezione.learn.map((l, j) => (
                                    <li key={j} className="flex items-start gap-1.5 text-gray-400">
                                      <CheckCircle size={10} className="text-primary mt-0.5 shrink-0" />
                                      {l}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-gray-600 font-semibold mb-1">Esercizi pratici</p>
                                <ul className="space-y-0.5">
                                  {lezione.exercises.map((ex, j) => (
                                    <li key={j} className="flex items-start gap-1.5 text-gray-400">
                                      <span className="text-primary mt-0.5 shrink-0">→</span>
                                      {ex}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="mt-3 bg-white/5 rounded-lg px-3 py-2 text-xs text-gray-400 flex items-center gap-2">
                              <Download size={11} className="text-primary shrink-0" />
                              <span><span className="text-white font-semibold">Worksheet:</span> {lezione.worksheet}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked overlay message */}
              {!sbloccato && (
                <div className="px-5 pb-4 text-xs text-gray-600">
                  Si sblocca automaticamente tra <span className="text-gray-400 font-semibold">{giorniMancanti} giorni</span>
                </div>
              )}

            </div>
          )
        })}

        {/* Upsell coaching */}
        <div className="mt-8 bg-gradient-to-br from-primary/20 to-orange-900/20 border border-primary/30 rounded-xl p-6 text-center">
          <p className="text-primary text-xs font-bold uppercase tracking-wide mb-2">Vuoi accelerare i risultati?</p>
          <h3 className="font-heading font-black text-lg mb-2">Affianca il coaching personalizzato</h3>
          <p className="text-gray-400 text-sm mb-4">
            Piano Start a €99 — 12 settimane con feedback diretto, revisione del piano e supporto costante.
          </p>
          <a href="/piani"
            className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors">
            Scopri i piani coaching →
          </a>
        </div>

      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
