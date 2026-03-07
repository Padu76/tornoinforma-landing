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

// ── Componente slide ────────────────────────────────────────────────────────
function SlideCard({ slide, visible }: { slide: Slide; visible: boolean }) {
  const tipoColori: Record<string, string> = {
    intro: 'from-orange-950/60 to-black',
    contenuto: 'from-gray-900 to-gray-950',
    citazione: 'from-gray-900 to-gray-950',
    lista: 'from-gray-900 to-gray-950',
    esercizio: 'from-orange-950/40 to-gray-950',
    recap: 'from-green-950/40 to-gray-950',
  }

  const tipoAccent: Record<string, string> = {
    intro: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
    contenuto: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
    citazione: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    lista: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
    esercizio: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    recap: 'text-green-400 bg-green-500/20 border-green-500/30',
  }

  return (
    <div
      className={`
        absolute inset-0 flex flex-col justify-center px-8 md:px-16 py-12
        bg-gradient-to-br ${tipoColori[slide.tipo] || tipoColori.contenuto}
        transition-all duration-500
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
      `}
    >
      {/* Badge tipo */}
      <div className={`inline-flex items-center gap-2 border rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide w-fit mb-6 ${tipoAccent[slide.tipo] || tipoAccent.contenuto}`}>
        {slide.icona && <span>{slide.icona}</span>}
        <span>{slide.tipo}</span>
      </div>

      {/* Titolo */}
      <h2 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4">
        {slide.titolo}
      </h2>

      {/* Testo principale */}
      {slide.testo && (
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
          {slide.testo}
        </p>
      )}

      {/* Highlight */}
      {slide.highlight && (
        <div className="border-l-4 border-orange-500 pl-5 mb-6">
          <p className="text-orange-300 text-base md:text-lg italic font-medium">
            {slide.highlight}
          </p>
        </div>
      )}

      {/* Lista puntata */}
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
  audioUrl,
  slideId,
  onEnded,
}: {
  audioUrl: string | null
  slideId: number
  onEnded: () => void
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Reset quando cambia slide
  useEffect(() => {
    setPlaying(false)
    setProgress(0)
    setDuration(0)
    setError(false)
    setLoading(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [slideId])

  // Auto-play quando arriva l'URL
  useEffect(() => {
    if (!audioUrl || !audioRef.current) return
    setLoading(true)
    setError(false)
    audioRef.current.src = audioUrl
    audioRef.current.load()
  }, [audioUrl])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {
        setError(true)
        setPlaying(false)
      })
    }
  }, [playing])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.muted = !muted
    setMuted(!muted)
  }, [muted])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const t = parseFloat(e.target.value)
    audioRef.current.currentTime = t
    setProgress(t)
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  if (!audioUrl) {
    return (
      <div className="flex items-center gap-3 text-gray-600 text-sm">
        <VolumeX size={16} />
        <span>Audio non disponibile per questa slide</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 w-full">
      <audio
        ref={audioRef}
        onLoadedMetadata={() => { setDuration(audioRef.current?.duration || 0); setLoading(false) }}
        onTimeUpdate={() => setProgress(audioRef.current?.currentTime || 0)}
        onEnded={() => { setPlaying(false); setProgress(0); onEnded() }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setError(true); setLoading(false) }}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
      />

      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        disabled={loading || error}
        className="w-10 h-10 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 rounded-full flex items-center justify-center transition-colors shrink-0"
      >
        {loading ? (
          <Loader size={14} className="text-white animate-spin" />
        ) : error ? (
          <AlertCircle size={14} className="text-gray-400" />
        ) : playing ? (
          <Pause size={14} className="text-white" />
        ) : (
          <Play size={14} className="text-white ml-0.5" />
        )}
      </button>

      {/* Progress bar */}
      <div className="flex-1 flex items-center gap-2">
        <span className="text-gray-500 text-xs w-8 shrink-0">{fmt(progress)}</span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={progress}
          onChange={handleSeek}
          className="flex-1 h-1 accent-orange-500 cursor-pointer"
        />
        <span className="text-gray-500 text-xs w-8 shrink-0 text-right">{fmt(duration)}</span>
      </div>

      {/* Mute */}
      <button onClick={toggleMute} className="text-gray-500 hover:text-white transition-colors shrink-0">
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {error && <span className="text-red-400 text-xs">Audio non trovato</span>}
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

  // Trova info lezione da corso-data
  const moduloNum = parseInt(lezioneId.split('.')[0])
  const modulo = MODULI.find(m => m.num === moduloNum)
  const lezioneInfo = modulo?.lessons.find(l => l.num === lezioneId)

  // Costruisce URL audio da Supabase Storage
  const getAudioUrl = (slide: Slide): string | null => {
    if (!lezioneData) return null
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) return null
    // Path: corso-audio/1-1/1.mp3
    const path = `${lezioneData.audioBasePath}/${slide.id}.mp3`
    return `${supabaseUrl}/storage/v1/object/public/corso-audio/${path.replace('corso-audio/', '')}`
  }

  const slides = lezioneData?.slides || []
  const slide = slides[slideIdx]
  const isUltima = slideIdx === slides.length - 1
  const isPrima = slideIdx === 0

  const goNext = useCallback(() => {
    if (!isUltima) setSlideIdx(i => i + 1)
  }, [isUltima])

  const goPrev = useCallback(() => {
    if (!isPrima) setSlideIdx(i => i - 1)
  }, [isPrima])

  // Keyboard navigation
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
      setCompletata(true)
    } catch {
      // Silent fail — segna come completata comunque lato UI
      setCompletata(true)
    } finally {
      setSalvando(false)
    }
  }

  if (!lezioneData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-black mb-2">Lezione non trovata</h1>
          <p className="text-gray-400 mb-6">La lezione {lezioneId} non esiste ancora.</p>
          <button onClick={() => router.back()} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
            ← Torna alla dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* TOP BAR */}
      <div className="bg-gray-950 border-b border-white/10 px-4 py-3 flex items-center gap-4 shrink-0">
        <button
          onClick={() => router.push(`/corso/dashboard?token=${token}`)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <Home size={15} /> Dashboard
        </button>
        <span className="text-gray-700">›</span>
        <span className="text-gray-400 text-sm hidden sm:block">Modulo {moduloNum}</span>
        <span className="text-gray-700 hidden sm:block">›</span>
        <span className="text-white text-sm font-semibold truncate flex-1">{lezioneData.titolo}</span>

        {/* Progresso slides */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-gray-500 text-xs">{slideIdx + 1}/{slides.length}</span>
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === slideIdx ? 'w-6 bg-orange-500' : i < slideIdx ? 'w-1.5 bg-orange-800' : 'w-1.5 bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SLIDE AREA */}
      <div className="flex-1 relative overflow-hidden">
        {slides.map((s, i) => (
          <SlideCard key={s.id} slide={s} visible={i === slideIdx} />
        ))}
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-gray-950/95 backdrop-blur border-t border-white/10 px-4 py-4 shrink-0">

        {/* Audio player */}
        <div className="mb-4">
          <AudioPlayer
            audioUrl={getAudioUrl(slide)}
            slideId={slide.id}
            onEnded={() => {
              // Auto-avanza dopo 1.5s dalla fine audio
              setTimeout(() => {
                if (!isUltima) setSlideIdx(i => i + 1)
              }, 1500)
            }}
          />
        </div>

        {/* Navigazione */}
        <div className="flex items-center justify-between gap-4">
          {/* Prev */}
          <button
            onClick={goPrev}
            disabled={isPrima}
            className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors text-sm"
          >
            <ChevronLeft size={18} /> Precedente
          </button>

          {/* Worksheet info */}
          {slide.tipo === 'esercizio' && lezioneInfo && (
            <div className="flex items-center gap-2 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">
              <BookOpen size={12} />
              <span>Worksheet: {lezioneInfo.worksheet}</span>
            </div>
          )}

          {/* Next o Completa */}
          {isUltima ? (
            completata ? (
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                <CheckCircle size={18} /> Lezione completata!
              </div>
            ) : (
              <button
                onClick={handleCompleta}
                disabled={salvando}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors"
              >
                {salvando ? <><Loader size={14} className="animate-spin" /> Salvataggio...</> : <><CheckCircle size={16} /> Completa Lezione</>}
              </button>
            )
          ) : (
            <button
              onClick={goNext}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
            >
              Avanti <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Hint tastiera */}
        <p className="text-center text-gray-700 text-xs mt-3">
          Usa ← → per navigare tra le slide
        </p>
      </div>

      {/* Schermata completamento */}
      {completata && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-white/10 rounded-3xl p-10 text-center max-w-md w-full">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-black text-2xl text-white mb-2">Lezione completata!</h2>
            <p className="text-gray-400 mb-8">{lezioneData.titolo}</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push(`/corso/dashboard?token=${token}`)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold transition-colors"
              >
                Torna alla Dashboard
              </button>
              <button
                onClick={() => { setCompletata(false); setSlideIdx(0) }}
                className="w-full text-gray-500 hover:text-gray-400 text-sm transition-colors flex items-center justify-center gap-2 py-2"
              >
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
