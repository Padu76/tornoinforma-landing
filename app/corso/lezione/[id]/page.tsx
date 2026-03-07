'use client'
// app/corso/lezione/[id]/page.tsx
// E:\tornoinforma-landing\app\corso\lezione\[id]\page.tsx

import { useEffect, useState, useRef, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import {
  ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX,
  CheckCircle, RotateCcw, Home, BookOpen, Loader, AlertCircle
} from 'lucide-react'
import { LEZIONI_SLIDES, type Slide } from '@/lib/lezione-slides'
import { MODULI } from '@/lib/corso-data'

// ── Slide Card ───────────────────────────────────────────────────────────────
function SlideCard({ slide, visible }: { slide: Slide; visible: boolean }) {
  const tipoGradient: Record<string, string> = {
    intro:     'from-orange-950/60 to-black',
    contenuto: 'from-gray-900 to-gray-950',
    citazione: 'from-gray-900 to-gray-950',
    lista:     'from-gray-900 to-gray-950',
    esercizio: 'from-orange-950/40 to-gray-950',
    recap:     'from-green-950/40 to-gray-950',
  }
  const tipoAccent: Record<string, string> = {
    intro:     'text-orange-400 bg-orange-500/20 border-orange-500/30',
    contenuto: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
    citazione: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    lista:     'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
    esercizio: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    recap:     'text-green-400 bg-green-500/20 border-green-500/30',
  }

  return (
    <div className={`
      absolute inset-0 flex flex-col justify-center px-8 md:px-16 py-12
      bg-gradient-to-br ${tipoGradient[slide.tipo] || tipoGradient.contenuto}
      transition-all duration-500
      ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
    `}>
      <div className={`inline-flex items-center gap-2 border rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide w-fit mb-6 ${tipoAccent[slide.tipo] || tipoAccent.contenuto}`}>
        {slide.icona && <span>{slide.icona}</span>}
        <span>{slide.tipo}</span>
      </div>

      <h2 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4">
        {slide.titolo}
      </h2>

      {slide.testo && (
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
          {slide.testo}
        </p>
      )}

      {slide.highlight && (
        <div className="border-l-4 border-orange-500 pl-5 mb-6">
          <p className="text-orange-300 text-base md:text-lg italic font-medium">
            {slide.highlight}
          </p>
        </div>
      )}

      {slide.punti && slide.punti.length > 0 && (
        <ul className="space-y-3 max-w-2xl">
          {slide.punti.map((punto, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm md:text-base leading-relaxed">
              <span className="w-6 h-6 bg-orange-500/20 border border-orange-500/40 rounded-full flex items-center justify-center text-orange-400 text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {punto}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ── Audio Player ─────────────────────────────────────────────────────────────
function AudioPlayer({
  lezioneNum,
  slide,
  token,
  onEnded,
}: {
  lezioneNum: string
  slide: Slide
  token: string
  onEnded: () => void
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [stato, setStato] = useState<'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'error'>('idle')
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  // Carica URL audio quando cambia slide
  useEffect(() => {
    setStato('loading')
    setProgress(0)
    setDuration(0)
    setAudioUrl(null)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    fetch(`/api/corso/audio?token=${encodeURIComponent(token)}&lezione=${lezioneNum}&slide=${slide.id}`)
      .then(r => r.json())
      .then(data => {
        if (data.ok && data.url) {
          setAudioUrl(data.url)
        } else {
          setStato('error')
        }
      })
      .catch(() => setStato('error'))
  }, [lezioneNum, slide.id, token])

  // Imposta src quando arriva URL e auto-play
  useEffect(() => {
    if (!audioUrl || !audioRef.current) return
    audioRef.current.src = audioUrl
    audioRef.current.load()
    audioRef.current.play()
      .then(() => setStato('playing'))
      .catch(() => setStato('ready')) // autoplay bloccato dal browser → aspetta click
  }, [audioUrl])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    if (stato === 'playing') {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => setStato('error'))
    }
  }, [stato])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.muted = !muted
    setMuted(!muted)
  }, [muted])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = parseFloat(e.target.value)
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`

  return (
    <div className="flex items-center gap-3 w-full">
      <audio
        ref={audioRef}
        onLoadedMetadata={() => { setDuration(audioRef.current?.duration || 0); setStato('ready') }}
        onTimeUpdate={() => setProgress(audioRef.current?.currentTime || 0)}
        onPlay={() => setStato('playing')}
        onPause={() => setStato('paused')}
        onEnded={() => { setStato('ready'); setProgress(0); onEnded() }}
        onError={() => setStato('error')}
      />

      {/* Pulsante play */}
      <button
        onClick={togglePlay}
        disabled={stato === 'loading' || stato === 'error' || stato === 'idle'}
        className="w-10 h-10 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 rounded-full flex items-center justify-center transition-colors shrink-0"
      >
        {stato === 'loading' || stato === 'idle' ? (
          <Loader size={14} className="text-white animate-spin" />
        ) : stato === 'error' ? (
          <AlertCircle size={14} className="text-gray-400" />
        ) : stato === 'playing' ? (
          <Pause size={14} className="text-white" />
        ) : (
          <Play size={14} className="text-white ml-0.5" />
        )}
      </button>

      {/* Barra progresso */}
      <div className="flex-1 flex items-center gap-2">
        <span className="text-gray-500 text-xs w-8 shrink-0">{fmt(progress)}</span>
        <input
          type="range" min={0} max={duration || 100} value={progress}
          onChange={handleSeek}
          className="flex-1 h-1 accent-orange-500 cursor-pointer"
        />
        <span className="text-gray-500 text-xs w-8 shrink-0 text-right">{fmt(duration)}</span>
      </div>

      {/* Mute */}
      <button onClick={toggleMute} className="text-gray-500 hover:text-white transition-colors shrink-0">
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {stato === 'loading' && <span className="text-gray-500 text-xs whitespace-nowrap">Generazione audio...</span>}
      {stato === 'error' && <span className="text-red-400 text-xs whitespace-nowrap">Audio non disponibile</span>}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
function LezioneContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const lezioneId = (params.id as string).replace('-', '.')
  const token = searchParams.get('token') || ''

  const lezioneData = LEZIONI_SLIDES[lezioneId]
  const [slideIdx, setSlideIdx] = useState(0)
  const [completata, setCompletata] = useState(false)
  const [salvando, setSalvando] = useState(false)

  const moduloNum = parseInt(lezioneId.split('.')[0])
  const modulo = MODULI.find(m => m.num === moduloNum)
  const lezioneInfo = modulo?.lessons.find(l => l.num === lezioneId)

  const slides = lezioneData?.slides || []
  const slide = slides[slideIdx]
  const isUltima = slideIdx === slides.length - 1
  const isPrima = slideIdx === 0

  const goNext = useCallback(() => { if (!isUltima) setSlideIdx(i => i + 1) }, [isUltima])
  const goPrev = useCallback(() => { if (!isPrima) setSlideIdx(i => i - 1) }, [isPrima])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  const handleCompleta = async () => {
    setSalvando(true)
    try {
      await fetch('/api/corso/progresso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, lezioneNum: lezioneId }),
      })
    } catch { /* silent */ }
    setCompletata(true)
    setSalvando(false)
  }

  if (!lezioneData) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-2xl font-black mb-2">Lezione non trovata</h1>
        <p className="text-gray-400 mb-6">La lezione {lezioneId} non è ancora disponibile.</p>
        <button onClick={() => router.back()} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
          ← Torna alla dashboard
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* TOP BAR */}
      <div className="bg-gray-950 border-b border-white/10 px-4 py-3 flex items-center gap-4 shrink-0">
        <button onClick={() => router.push(`/corso/dashboard?token=${token}`)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <Home size={15} /> Dashboard
        </button>
        <span className="text-gray-700">›</span>
        <span className="text-gray-400 text-sm hidden sm:block">Modulo {moduloNum}</span>
        <span className="text-gray-700 hidden sm:block">›</span>
        <span className="text-white text-sm font-semibold truncate flex-1">{lezioneData.titolo}</span>

        {/* Dots slide */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-gray-500 text-xs">{slideIdx + 1}/{slides.length}</span>
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setSlideIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === slideIdx ? 'w-6 bg-orange-500' : i < slideIdx ? 'w-1.5 bg-orange-800' : 'w-1.5 bg-gray-700'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* SLIDE */}
      <div className="flex-1 relative overflow-hidden">
        {slides.map((s, i) => (
          <SlideCard key={s.id} slide={s} visible={i === slideIdx} />
        ))}
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-gray-950/95 backdrop-blur border-t border-white/10 px-4 py-4 shrink-0">

        {/* Audio player ElevenLabs */}
        <div className="mb-4">
          <AudioPlayer
            lezioneNum={lezioneId}
            slide={slide}
            token={token}
            onEnded={() => {
              setTimeout(() => { if (!isUltima) setSlideIdx(i => i + 1) }, 1500)
            }}
          />
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between gap-4">
          <button onClick={goPrev} disabled={isPrima}
            className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors text-sm">
            <ChevronLeft size={18} /> Precedente
          </button>

          {slide.tipo === 'esercizio' && lezioneInfo && (
            <div className="flex items-center gap-2 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">
              <BookOpen size={12} />
              <span className="hidden sm:block">Worksheet: {lezioneInfo.worksheet}</span>
              <span className="sm:hidden">Worksheet</span>
            </div>
          )}

          {isUltima ? (
            completata ? (
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                <CheckCircle size={18} /> Completata!
              </div>
            ) : (
              <button onClick={handleCompleta} disabled={salvando}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">
                {salvando ? <><Loader size={14} className="animate-spin" /> Salvo...</> : <><CheckCircle size={16} /> Completa</>}
              </button>
            )
          ) : (
            <button onClick={goNext}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">
              Avanti <ChevronRight size={18} />
            </button>
          )}
        </div>

        <p className="text-center text-gray-700 text-xs mt-3">← → per navigare · audio generato da ElevenLabs</p>
      </div>

      {/* Modal completamento */}
      {completata && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-white/10 rounded-3xl p-10 text-center max-w-md w-full">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-black text-2xl text-white mb-2">Lezione completata!</h2>
            <p className="text-gray-400 mb-8">{lezioneData.titolo}</p>
            <div className="space-y-3">
              <button onClick={() => router.push(`/corso/dashboard?token=${token}`)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold transition-colors">
                Torna alla Dashboard
              </button>
              <button onClick={() => { setCompletata(false); setSlideIdx(0) }}
                className="w-full text-gray-500 hover:text-gray-400 text-sm transition-colors flex items-center justify-center gap-2 py-2">
                <RotateCcw size={14} /> Rivedi la lezione
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function LezionePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LezioneContent />
    </Suspense>
  )
}
