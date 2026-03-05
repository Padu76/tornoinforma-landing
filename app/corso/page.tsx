// app/corso/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle, Lock, ChevronDown, ChevronUp, Star, Clock, BookOpen, Download, ArrowRight, Shield, Zap, Target, BarChart3 } from 'lucide-react'

const MODULI_PREVIEW = [
  { num: 1, title: 'Motivazione e Mentalita', subtitle: 'Le fondamenta psicologiche della trasformazione', lezioni: 4, durata: '~150 min', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', unlock: 'Subito' },
  { num: 2, title: 'Alimentazione per il Successo', subtitle: 'Nutrizione pratica, sostenibile e senza ossessioni', lezioni: 4, durata: '~165 min', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', unlock: 'Settimana 2' },
  { num: 3, title: 'Il Piano di Allenamento', subtitle: 'Schede complete, progressive e adattabili', lezioni: 4, durata: '~165 min', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', unlock: 'Settimana 3' },
  { num: 4, title: 'La Sfida dei 30 Giorni', subtitle: 'Il sistema per costruire costanza e risultati', lezioni: 4, durata: '~150 min', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', unlock: 'Settimana 4' },
  { num: 5, title: 'Strumenti e Monitoraggio', subtitle: 'Misura, adatta e costruisci il lungo termine', lezioni: 4, durata: '~135 min', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80', unlock: 'Settimana 5' },
]

const FEATURES = [
  { icon: BookOpen, title: 'Testo approfondito', desc: 'Ogni lezione spiega il perche, non solo il cosa. Capisci la logica dietro ogni scelta.', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80' },
  { icon: Target, title: 'Domande di riflessione', desc: 'Fermarti a riflettere e la parte piu sottovalutata del cambiamento. E qui che avviene.', img: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=400&q=80' },
  { icon: Zap, title: 'Esercizi pratici', desc: '3-4 esercizi per lezione da completare prima di andare avanti. La conoscenza senza azione non serve.', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' },
  { icon: BarChart3, title: 'Worksheet scaricabile', desc: 'Un PDF da conservare. Il tuo percorso documentato, nero su bianco.', img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80' },
]

const TESTIMONIALS = [
  { nome: 'Francesca M.', ruolo: 'Impiegata, 34 anni', testo: 'Ho perso 8 kg in 3 mesi. Ma soprattutto ho capito cosa mangio e perche mi alleno. Finalmente.', stelle: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { nome: 'Marco T.', ruolo: 'Libero professionista, 41 anni', testo: 'I worksheet mi hanno cambiato la vita. Li rileggo ancora quando ho bisogno di motivazione.', stelle: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
  { nome: 'Elena R.', ruolo: 'Insegnante, 29 anni', testo: 'Il modulo sulla mentalita vale da solo il prezzo del corso. Non me lo aspettavo da un corso fitness.', stelle: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
]

const FAQ_ITEMS = [
  { q: 'Come accedo al corso dopo il pagamento?', a: 'Ricevi subito una email con il link di accesso. Il Modulo 1 e disponibile immediatamente. I moduli successivi si sbloccano automaticamente ogni 7 giorni.' },
  { q: 'Perche i moduli si sbloccano a settimane?', a: 'Il drip settimanale non e una limitazione — e una scelta strategica. Chi riceve tutto insieme di solito non completa nulla. Con un modulo alla settimana hai il tempo di applicare davvero quello che impari.' },
  { q: 'Per quanto tempo ho accesso?', a: 'Accesso illimitato. Una volta acquistato, i contenuti sono tuoi per sempre. Puoi scaricare tutti i PDF e worksheet sul tuo dispositivo.' },
  { q: 'Ho bisogno di attrezzatura o palestra?', a: 'No. Il corso include schede sia per palestra che per casa. Scegli il piano piu adatto a te.' },
  { q: 'E adatto anche ai principianti?', a: "Si. Il corso parte dalle fondamenta e include varianti per ogni livello. C'e un modulo intero dedicato a scegliere il piano giusto." },
  { q: 'Posso aggiungere il coaching personalizzato?', a: 'Certo. Il corso e self-service, ma puoi affiancarlo con un piano coaching. Spesso i clienti del corso poi fanno il salto al piano Start.' },
]

export default function CorsoPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [step, setStep] = useState<'form' | 'paypal'>('form')
  const [error, setError] = useState('')

  const handleProcedi = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@') || !nome.trim()) { setError('Inserisci nome e email validi'); return }
    setError(''); setStep('paypal')
  }

  const handlePayPal = async () => {
    setLoading(true)
    try {
      sessionStorage.setItem('corso_email', email)
      sessionStorage.setItem('corso_nome', nome)
      const returnUrl = encodeURIComponent(`${window.location.origin}/corso/successo?email=${encodeURIComponent(email)}&nome=${encodeURIComponent(nome)}`)
      const cancelUrl = encodeURIComponent(`${window.location.origin}/corso?cancelled=1`)
      window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${process.env.NEXT_PUBLIC_PAYPAL_EMAIL}&item_name=Torno+in+Forma+Corso+Completo&amount=249.00&currency_code=EUR&return=${returnUrl}&cancel_return=${cancelUrl}&no_note=1&no_shipping=1`
    } catch { setError('Errore. Riprova.'); setLoading(false) }
  }

  return (
    <main className="bg-black font-sans">

      {/* NAVBAR */}
      <nav className="bg-black/95 backdrop-blur py-4 px-6 flex items-center justify-between sticky top-0 z-50 border-b border-white/10">
        <a href="/"><img src="/logo.svg" alt="Torno in Forma" className="h-8" /></a>
        <div className="flex items-center gap-4">
          <a href="/corso/accesso" className="text-gray-400 hover:text-white text-sm transition-colors hidden sm:block">Hai già il corso?</a>
          <a href="#acquista" className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors">Acquista €249</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80" alt="hero" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-28 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            CORSO COMPLETO SELF-SERVICE
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-black mb-6 leading-[1.05] tracking-tight">
            Torna in Forma.<br /><span className="text-primary">Al Tuo Ritmo.</span><br />Per Sempre.
          </h1>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            5 moduli, 20 lezioni approfondite, 20 worksheet scaricabili. Un percorso strutturato dalla motivazione zero ai risultati concreti — senza coach, senza abbonamenti.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[{ icon: Clock, label: '~13 ore di contenuto' }, { icon: Download, label: '20 worksheet PDF' }, { icon: BookOpen, label: 'Accesso a vita' }, { icon: Shield, label: 'Pagamento sicuro' }].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-300"><s.icon size={15} className="text-primary" />{s.label}</div>
            ))}
          </div>
          <a href="#acquista" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-2xl shadow-primary/40 hover:scale-105">
            Inizia Adesso — €249 <ArrowRight size={20} />
          </a>
          <p className="text-gray-500 text-sm mt-4">Pagamento sicuro via PayPal · Carta di credito accettata</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl font-black text-white mb-3">Non l&apos;ennesimo PDF fitness</h2>
            <p className="text-gray-400 text-lg">Ogni lezione richiede 30-50 minuti di lavoro attivo. Non di lettura passiva.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="group bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-1">
                <div className="relative h-44 overflow-hidden">
                  <Image src={f.img} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                    <f.icon size={17} className="text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white text-base mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULI */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl font-black text-white mb-3">Il Programma Completo</h2>
            <p className="text-gray-400 text-lg">Un modulo alla settimana. Cinque settimane per cambiare tutto.</p>
          </div>
          <div className="space-y-4">
            {MODULI_PREVIEW.map((mod, i) => (
              <div key={mod.num} className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all">
                <div className="absolute inset-0">
                  <Image src={mod.img} alt={mod.title} fill className="object-cover opacity-10 group-hover:opacity-20 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />
                </div>
                <div className="relative flex items-center gap-5 p-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shrink-0 ${i === 0 ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>
                    {mod.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">Modulo {mod.num}</span>
                      <span className="text-gray-600 text-xs">·</span>
                      <span className="text-gray-500 text-xs">{mod.lezioni} lezioni · {mod.durata}</span>
                    </div>
                    <h3 className="font-bold text-white text-base leading-tight">{mod.title}</h3>
                    <p className="text-gray-500 text-sm mt-0.5 hidden sm:block">{mod.subtitle}</p>
                  </div>
                  <div className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${i === 0 ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'}`}>
                    {i === 0 ? <><span className="w-1.5 h-1.5 bg-green-400 rounded-full" />Subito</> : <><Lock size={10} />{mod.unlock}</>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PER CHI E */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl font-black text-white text-center mb-12">Questo corso fa per te se...</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { text: 'Hai già provato palestre e diete senza risultati duraturi', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=80&q=80' },
              { text: 'Vuoi capire il perche dietro ogni scelta, non solo seguire istruzioni', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=80&q=80' },
              { text: 'Preferisci lavorare in autonomia, al tuo ritmo e senza scadenze', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&q=80' },
              { text: 'Hai bisogno di struttura ma non vuoi un coach a pagamento mensile', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&q=80' },
              { text: 'Vuoi qualcosa da consultare ogni volta che ne hai bisogno', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=80&q=80' },
              { text: 'Sei stufo di informazioni sparse e vuoi un percorso completo', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=80&q=80' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 hover:bg-white/8 border border-white/5 hover:border-primary/20 rounded-xl p-4 transition-all">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.img} alt="" fill className="object-cover opacity-70" />
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={15} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl font-black text-white mb-3">Cosa dicono i clienti</h2>
            <p className="text-gray-400">Risultati reali da persone reali.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-gray-900 border border-white/10 rounded-2xl p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stelle)].map((_, j) => <Star key={j} size={14} className="text-primary fill-primary" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">&ldquo;{t.testo}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image src={t.avatar} alt={t.nome} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.nome}</p>
                    <p className="text-gray-500 text-xs">{t.ruolo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACQUISTA */}
      <section id="acquista" className="py-24 px-6 bg-gray-950">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl font-black text-white mb-3">Inizia il tuo percorso</h2>
            <p className="text-gray-400">Un investimento una tantum. Risultati per sempre.</p>
          </div>
          <div className="bg-gray-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="relative bg-primary px-8 pt-8 pb-10 text-white text-center overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full" />
              <p className="relative text-orange-100 text-xs font-bold mb-2 tracking-widest uppercase">Accesso Completo</p>
              <div className="relative text-7xl font-black mb-1">€249</div>
              <p className="relative text-orange-100/80 text-sm">pagamento unico · accesso a vita</p>
            </div>
            <div className="px-8 py-8">
              <ul className="space-y-3 mb-8">
                {['5 moduli completi (20 lezioni)', '~13 ore di contenuto approfondito', '20 worksheet PDF scaricabili', 'Modulo 1 disponibile subito', 'Nuovi moduli ogni 7 giorni', 'Accesso illimitato senza scadenze'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle size={12} className="text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              {step === 'form' ? (
                <form onSubmit={handleProcedi} className="space-y-3">
                  <input type="text" placeholder="Il tuo nome" value={nome} onChange={e => setNome(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors" required />
                  <input type="email" placeholder="La tua email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors" required />
                  {error && <p className="text-red-400 text-xs px-1">{error}</p>}
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base hover:bg-orange-600 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]">
                    Procedi al Pagamento <ArrowRight size={18} />
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm">
                    <p className="text-white font-semibold">{nome}</p>
                    <p className="text-gray-500">{email}</p>
                  </div>
                  <button onClick={handlePayPal} disabled={loading}
                    className="w-full bg-[#FFC439] text-black py-4 rounded-xl font-bold text-base hover:bg-yellow-400 transition-all disabled:opacity-60 flex items-center justify-center gap-3 hover:scale-[1.02]">
                    {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Caricamento...</span>
                      : <><img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-5 rounded-sm" />Paga con PayPal</>}
                  </button>
                  <button onClick={() => setStep('form')} className="w-full text-gray-600 text-sm hover:text-gray-400 transition-colors py-1">← Modifica dati</button>
                </div>
              )}
              <div className="flex items-center justify-center gap-2 mt-5 text-gray-600 text-xs">
                <Shield size={12} /> Pagamento sicuro via PayPal · Carta di credito accettata
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl font-black text-white text-center mb-12">Domande Frequenti</h2>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-gray-900 border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold text-white text-sm pr-4">{item.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${faqOpen === i ? 'bg-primary' : 'bg-white/10'}`}>
                    {faqOpen === i ? <ChevronUp size={14} className="text-white" /> : <ChevronDown size={14} className="text-gray-400" />}
                  </div>
                </button>
                {faqOpen === i && <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="cta" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </div>
        <div className="relative max-w-xl mx-auto text-center text-white">
          <h2 className="font-heading text-4xl md:text-5xl font-black mb-4">
            Inizia oggi.<br /><span className="text-primary">Il primo passo</span> e sempre il piu difficile.
          </h2>
          <p className="text-gray-400 mb-10 text-lg">Il Modulo 1 ti aspetta. Ci vogliono 35 minuti per la prima lezione.</p>
          <a href="#acquista" className="inline-flex items-center gap-2 bg-primary text-white px-12 py-5 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl shadow-primary/40">
            Acquista il Corso — €249 <ArrowRight size={20} />
          </a>
          <p className="text-gray-600 text-sm mt-4">Pagamento sicuro · Accesso immediato</p>
        </div>
      </section>

    </main>
  )
}