// app/corso/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle, Lock, ChevronDown, ChevronUp, Star, Clock, BookOpen, Download } from 'lucide-react'

const MODULI_PREVIEW = [
  { num: 1, title: 'Motivazione e Mentalita', subtitle: 'Le fondamenta psicologiche', lezioni: 4, colore: '#E8450A' },
  { num: 2, title: 'Alimentazione per il Successo', subtitle: 'Nutrizione pratica e sostenibile', lezioni: 4, colore: '#E8450A' },
  { num: 3, title: 'Il Piano di Allenamento', subtitle: 'Schede complete per ogni obiettivo', lezioni: 4, colore: '#E8450A' },
  { num: 4, title: 'La Sfida dei 30 Giorni', subtitle: 'Il sistema per costruire costanza', lezioni: 4, colore: '#E8450A' },
  { num: 5, title: 'Strumenti e Monitoraggio', subtitle: 'Misura e adatta nel tempo', lezioni: 4, colore: '#E8450A' },
]

const FAQ_ITEMS = [
  {
    q: 'Come accedo al corso dopo il pagamento?',
    a: 'Ricevi subito una email con il link di accesso alla tua area personale. Il Modulo 1 e disponibile immediatamente. I moduli successivi si sbloccano automaticamente ogni 7 giorni.',
  },
  {
    q: 'Perche i moduli si sbloccano a settimane?',
    a: "Il drip settimanale non e una limitazione — e una scelta strategica. Chi riceve tutto insieme di solito non completa nulla. Con un modulo alla settimana hai il tempo di applicare davvero quello che impari prima di andare avanti.",
  },
  {
    q: 'Per quanto tempo ho accesso?',
    a: 'Accesso illimitato. Una volta acquistato il corso, i contenuti sono tuoi per sempre. Puoi scaricare tutti i PDF e worksheet sul tuo dispositivo.',
  },
  {
    q: 'Ho bisogno di attrezzatura o palestra?',
    a: 'No. Il corso include schede sia per palestra che per casa con attrezzatura minima. Scegli il piano piu adatto a te.',
  },
  {
    q: 'E adatto anche ai principianti?',
    a: "Si. Il corso parte dalle fondamenta e include varianti per ogni livello. C'e un modulo intero dedicato a capire il tuo punto di partenza e scegliere il piano giusto.",
  },
  {
    q: 'Posso avere coaching personalizzato?',
    a: 'Il corso e self-service. Se vuoi supporto diretto puoi affiancare il corso con un piano coaching su tornoinforma.it. Spesso i clienti del corso poi fanno il salto al piano Start.',
  },
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
    if (!email.includes('@') || !nome.trim()) {
      setError('Inserisci nome e email validi')
      return
    }
    setError('')
    setStep('paypal')
  }

  const handlePayPal = async () => {
    setLoading(true)
    try {
      // Salva email+nome in sessionStorage per recuperarli dopo il pagamento
      sessionStorage.setItem('corso_email', email)
      sessionStorage.setItem('corso_nome', nome)

      // Redirect a PayPal — l'URL di ritorno chiama /corso/successo
      const returnUrl = encodeURIComponent(`${window.location.origin}/corso/successo?email=${encodeURIComponent(email)}&nome=${encodeURIComponent(nome)}`)
      const cancelUrl = encodeURIComponent(`${window.location.origin}/corso?cancelled=1`)

      window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${process.env.NEXT_PUBLIC_PAYPAL_EMAIL}&item_name=Torno+in+Forma+Corso+Completo&amount=127.00&currency_code=EUR&return=${returnUrl}&cancel_return=${cancelUrl}&no_note=1&no_shipping=1`
    } catch {
      setError('Errore nel avvio del pagamento. Riprova.')
      setLoading(false)
    }
  }

  return (
    <main className="bg-white">

      {/* NAVBAR MINIMAL */}
      <nav className="bg-black py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Torno in Forma" className="h-8" />
        </div>
        <a href="#acquista" className="bg-primary text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors">
          Acquista €127
        </a>
      </nav>

      {/* HERO */}
      <section className="bg-black text-white pt-16 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-primary/20 border border-primary/40 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            CORSO COMPLETO SELF-SERVICE
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black mb-6 leading-tight">
            Torna in Forma.<br />
            <span className="text-primary">Al Tuo Ritmo.</span><br />
            Per Sempre.
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            5 moduli completi, 20 lezioni approfondite, 20 worksheet scaricabili.
            Un percorso strutturato che ti porta dalla motivazione zero ai risultati concreti —
            senza coach, senza abbonamenti, senza scadenze.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-gray-400">
            <div className="flex items-center gap-2"><Clock size={16} className="text-primary" /> ~13 ore di contenuto</div>
            <div className="flex items-center gap-2"><Download size={16} className="text-primary" /> 20 worksheet PDF</div>
            <div className="flex items-center gap-2"><BookOpen size={16} className="text-primary" /> Accesso a vita</div>
            <div className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Un modulo a settimana</div>
          </div>
          <a href="#acquista"
            className="inline-block bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50">
            Inizia Adesso — €127
          </a>
          <p className="text-gray-500 text-sm mt-3">Pagamento sicuro via PayPal. Accesso immediato al Modulo 1.</p>
        </div>
      </section>

      {/* COSA E DIVERSO */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-black text-center mb-4">Non l&apos;ennesimo PDF fitness</h2>
          <p className="text-gray-600 text-center mb-10">
            Ogni lezione richiede 30-50 minuti di lavoro attivo. Non di lettura passiva.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🧠', title: 'Testo approfondito', desc: 'Ogni lezione spiega il perche, non solo il cosa. Capisci la logica dietro ogni scelta.' },
              { icon: '💬', title: 'Domande di riflessione', desc: 'Fermarti a riflettere e la parte piu sottovalutata del cambiamento. E qui che avviene.' },
              { icon: '✏️', title: 'Esercizi pratici', desc: '3-4 esercizi per lezione da completare prima di andare avanti. La conoscenza senza azione non serve.' },
              { icon: '📋', title: 'Worksheet compilabile', desc: 'Un documento PDF da scaricare e tenere. Il tuo percorso documentato, nero su bianco.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULI */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-black text-center mb-2">Il Programma Completo</h2>
          <p className="text-gray-500 text-center mb-10">Un modulo alla settimana. Cinque settimane per cambiare tutto.</p>
          <div className="space-y-4">
            {MODULI_PREVIEW.map((mod, i) => (
              <div key={mod.num} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-black text-white p-5 flex items-center gap-4">
                  <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    MODULO {mod.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-base">{mod.title}</h3>
                    <p className="text-gray-400 text-sm">{mod.subtitle}</p>
                  </div>
                  <div className="text-right text-gray-400 text-sm whitespace-nowrap">
                    {i === 0 ? <span className="text-green-400 font-semibold">Subito</span>
                      : <span className="flex items-center gap-1"><Lock size={12} /> Sett. {i + 1}</span>}
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <p className="text-sm text-gray-500">{mod.lezioni} lezioni • ~{30 + i * 5 + 120} min totali • {mod.lezioni} worksheet inclusi</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PER CHI E */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-black text-center mb-10">Questo corso fa per te se...</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Hai gia provato palestre e diete senza risultati duraturi',
              'Vuoi capire il perche dietro ogni scelta, non solo seguire istruzioni',
              'Preferisci lavorare in autonomia, al tuo ritmo',
              'Hai bisogno di struttura ma non vuoi un coach a pagamento mensile',
              'Vuoi qualcosa che puoi tornare a consultare nel tempo',
              'Sei stufo di informazioni sparse e vuoi un percorso completo',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
                <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-black text-center mb-10">Cosa dicono i clienti</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { nome: 'Francesca M.', testo: 'Ho perso 8 kg in 3 mesi. Ma soprattutto ho capito cosa mangio e perche mi alleno. Finalmente.', stelle: 5 },
              { nome: 'Marco T.', testo: 'I worksheet mi hanno cambiato la vita. Ho ancora tutto salvato sul telefono e li rileggo quando ho bisogno di motivazione.', stelle: 5 },
              { nome: 'Elena R.', testo: 'Il modulo sulla mentalita vale da solo il prezzo del corso. Non me lo aspettavo da un corso fitness.', stelle: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stelle)].map((_, j) => <Star key={j} size={14} className="text-primary fill-primary" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{t.testo}&rdquo;</p>
                <p className="font-semibold text-sm">{t.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACQUISTA */}
      <section id="acquista" className="py-20 px-6 bg-white">
        <div className="max-w-lg mx-auto">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-primary p-6 text-white text-center">
              <p className="text-primary-100 text-sm font-semibold mb-1 opacity-80">ACCESSO COMPLETO</p>
              <div className="text-5xl font-black mb-1">€127</div>
              <p className="text-sm opacity-80">pagamento unico • accesso a vita</p>
            </div>
            <div className="p-8">
              <ul className="space-y-3 mb-8">
                {[
                  '5 moduli completi (20 lezioni)',
                  '~13 ore di contenuto approfondito',
                  '20 worksheet PDF scaricabili',
                  'Modulo 1 disponibile subito',
                  'Nuovi moduli ogni settimana',
                  'Accesso illimitato senza scadenze',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckCircle size={16} className="text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {step === 'form' ? (
                <form onSubmit={handleProcedi} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Il tuo nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    required
                  />
                  <input
                    type="email"
                    placeholder="La tua email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    required
                  />
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <button type="submit"
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base hover:bg-orange-600 transition-colors">
                    Procedi al Pagamento →
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4 text-sm text-gray-400">
                    <p className="text-white font-semibold">{nome}</p>
                    <p>{email}</p>
                  </div>
                  <button
                    onClick={handlePayPal}
                    disabled={loading}
                    className="w-full bg-[#FFC439] text-black py-4 rounded-xl font-bold text-base hover:bg-yellow-400 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {loading ? 'Caricamento...' : (
                      <><img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-5" /> Paga con PayPal</>
                    )}
                  </button>
                  <button onClick={() => setStep('form')} className="w-full text-gray-500 text-sm hover:text-gray-400 transition-colors">
                    ← Modifica dati
                  </button>
                </div>
              )}

              <p className="text-gray-600 text-xs text-center mt-4">
                Pagamento sicuro via PayPal. Puoi usare anche carta di credito senza conto PayPal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-black text-center mb-10">Domande Frequenti</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-sm pr-4">{item.q}</span>
                  {faqOpen === i ? <ChevronUp size={18} className="text-primary shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 px-6 bg-black text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-3xl font-black mb-4">Inizia oggi.</h2>
          <p className="text-gray-400 mb-8">Il Modulo 1 ti aspetta. Ci vogliono 35 minuti per completare la prima lezione.</p>
          <a href="#acquista"
            className="inline-block bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all">
            Acquista il Corso — €127
          </a>
        </div>
      </section>

    </main>
  )
}
