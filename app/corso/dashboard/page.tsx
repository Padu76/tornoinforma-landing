'use client'
// app/corso/dashboard/page.tsx
// E:\tornoinforma-landing\app\corso\dashboard\page.tsx

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Lock, Download, CheckCircle, Clock, ChevronDown, ChevronUp,
  LogOut, BookOpen, Play, Star
} from 'lucide-react'
import { MODULI, getModuliSbloccati, getGiorniAlProssimoModulo } from '@/lib/corso-data'
import { LEZIONI_SLIDES } from '@/lib/lezione-slides'

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
  const [lezioniCompletate, setLezioniCompletate] = useState<string[]>([])

  useEffect(() => {
    if (!token) { router.replace('/corso/accesso'); return }

    fetch(`/api/corso/accesso?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          setSessione(data.sessione)
          sessionStorage.setItem('corso_token', token)
        } else {
          setError(data.error || 'Link scaduto o non valido.')
        }
        setLoading(false)
      })
      .catch(() => { setError('Errore di rete.'); setLoading(false) })
  }, [token, router])

  // Carica progressi lezioni
  useEffect(() => {
    if (!token) return
    fetch(`/api/corso/progresso?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => { if (data.ok) setLezioniCompletate(data.lezioniCompletate) })
      .catch(() => {})
  }, [token])

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
        <a href="/corso/accesso" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors text-sm">
          Richiedi nuovo link
        </a>
      </div>
    </div>
  )

  if (!sessione) return null

  const sbloccati = getModuliSbloccati(sessione.acquistato_at)
  const totLezioni = MODULI.reduce((acc, m) => acc + m.lessons.length, 0)
  const progresso = Math.round((lezioniCompletate.length / totLezioni) * 100)

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

      {/* HEADER */}
      <div className="bg-black border-b border-white/10 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-2xl font-black mb-1">
            Ciao{sessione.nome ? `, ${sessione.nome}` : ''}! 👋
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Acquistato il {new Date(sessione.acquistato_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          {/* Barra progresso */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 bg-white/10 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all duration-700" style={{ width: `${progresso}%` }} />
            </div>
            <span className="text-sm text-gray-400 whitespace-nowrap">{lezioniCompletate.length}/{totLezioni} lezioni</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>{sbloccati.length}/5 moduli sbloccati</span>
            <span>·</span>
            <span>{progresso}% completato</span>
          </div>
        </div>
      </div>

      {/* CONTENUTO */}
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">

        {/* Link indice PDF */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={20} className="text-orange-500" />
            <div>
              <p className="font-semibold text-sm">Indice del Corso</p>
              <p className="text-gray-500 text-xs">Descrizione completa di tutte le 20 lezioni</p>
            </div>
          </div>
          <a href={`/api/corso/pdf?token=${token}&file=indice`}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            <Download size={14} /> Scarica
          </a>
        </div>

        {/* MODULI */}
        {MODULI.map((mod) => {
          const sbloccato = sbloccati.includes(mod.num)
          const giorniMancanti = sbloccato ? 0 : getGiorniAlProssimoModulo(sessione.acquistato_at, mod.num)
          const aperto = moduloAperto === mod.num
          const lezioniModCompletate = mod.lessons.filter(l => lezioniCompletate.includes(l.num)).length
          const haSlides = mod.lessons.some(l => !!LEZIONI_SLIDES[l.num])

          return (
            <div key={mod.num}
              className={`rounded-xl border overflow-hidden transition-all ${sbloccato ? 'border-white/20 bg-white/5' : 'border-white/10 bg-white/2 opacity-60'}`}>

              {/* Header modulo */}
              <button
                onClick={() => sbloccato && setModuloAperto(aperto ? null : mod.num)}
                className={`w-full text-left p-5 flex items-center gap-4 ${sbloccato ? 'hover:bg-white/5 cursor-pointer' : 'cursor-default'} transition-colors`}>

                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${sbloccato ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-500'}`}>
                  {sbloccato ? mod.num : <Lock size={14} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">Modulo {mod.num}</span>
                    {sbloccato && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                        {lezioniModCompletate}/{mod.lessons.length} completate
                      </span>
                    )}
                    {!sbloccato && (
                      <span className="text-xs bg-white/10 text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock size={10} /> {giorniMancanti} giorni
                      </span>
                    )}
                    {haSlides && sbloccato && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star size={9} /> Interattivo
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-base leading-tight">{mod.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{mod.subtitle} · {mod.lessons.length} lezioni</p>
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
                  <div className="px-5 py-4 bg-orange-500/10 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-orange-400">PDF Modulo {mod.num}</p>
                      <p className="text-xs text-gray-400">Contiene tutte le lezioni e i worksheet</p>
                    </div>
                    <a href={`/api/corso/pdf?token=${token}&file=modulo${mod.num}`}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      <Download size={14} /> PDF
                    </a>
                  </div>

                  {/* Lista lezioni */}
                  <div className="divide-y divide-white/5">
                    {mod.lessons.map((lezione, i) => {
                      const completata = lezioniCompletate.includes(lezione.num)
                      const hasSlides = !!LEZIONI_SLIDES[lezione.num]
                      const lezioneSlug = lezione.num.replace('.', '-')

                      return (
                        <div key={lezione.num} className="px-5 py-4">
                          <div className="flex items-start gap-3">

                            {/* Stato completamento */}
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${completata ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                              {completata ? <CheckCircle size={14} /> : <span className="text-xs font-bold">{i + 1}</span>}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className={`font-semibold text-sm ${completata ? 'text-gray-400 line-through' : 'text-white'}`}>
                                  {lezione.title}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock size={10} /> {lezione.duration}
                                </span>
                                {completata && <span className="text-xs text-green-400">✓ Completata</span>}
                              </div>

                              <p className="text-gray-400 text-xs leading-relaxed mb-3">{lezione.desc}</p>

                              {/* Bottoni azione */}
                              <div className="flex gap-2 flex-wrap">
                                {hasSlides ? (
                                  <button
                                    onClick={() => router.push(`/corso/lezione/${lezioneSlug}?token=${token}`)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${completata
                                      ? 'bg-white/10 hover:bg-white/20 text-gray-300'
                                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                                      }`}
                                  >
                                    <Play size={12} />
                                    {completata ? 'Rivedi lezione' : 'Inizia lezione'}
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs bg-white/5 text-gray-500 border border-white/10">
                                    <BookOpen size={12} />
                                    Disponibile nel PDF
                                  </div>
                                )}

                                {/* Worksheet info */}
                                <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-white/5 rounded-lg px-3 py-2">
                                  <Download size={10} className="text-orange-500/60" />
                                  {lezione.worksheet}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Locked message */}
              {!sbloccato && (
                <div className="px-5 pb-4 text-xs text-gray-600">
                  Si sblocca automaticamente tra <span className="text-gray-400 font-semibold">{giorniMancanti} giorni</span>
                </div>
              )}
            </div>
          )
        })}

        {/* Upsell coaching */}
        <div className="mt-8 bg-gradient-to-br from-orange-500/20 to-orange-900/20 border border-orange-500/30 rounded-xl p-6 text-center">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-wide mb-2">Vuoi accelerare?</p>
          <h3 className="font-heading font-black text-lg mb-2">Affianca il coaching personalizzato</h3>
          <p className="text-gray-400 text-sm mb-4">
            Piano Start a €99 — con feedback diretto, revisione del piano e supporto costante.
          </p>
          <a href="/#percorsi"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors">
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
        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
