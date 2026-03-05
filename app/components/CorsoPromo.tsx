// app/components/CorsoPromo.tsx
import { BookOpen, Download, Clock, ArrowRight, CheckCircle } from 'lucide-react'

export default function CorsoPromo() {
  return (
    <section className="py-20 px-4 bg-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-block bg-primary/20 border border-primary/40 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
            NOVITÀ — CORSO SELF-SERVICE
          </span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl font-black text-center mb-4">
          Preferisci imparare <span className="text-primary">al tuo ritmo?</span>
        </h2>
        <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
          Il corso completo Torno in Forma — 5 moduli, 20 lezioni approfondite,
          20 worksheet scaricabili. Niente coaching, niente abbonamento. Paghi una volta, accedi per sempre.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* Left: features */}
          <div className="space-y-4">
            {[
              { icon: BookOpen, title: '20 lezioni approfondite', desc: 'Motivazione, alimentazione, allenamento, sfida 30 giorni e monitoraggio.' },
              { icon: Download, title: '20 worksheet PDF scaricabili', desc: 'Un documento compilabile per ogni lezione. Il tuo percorso documentato.' },
              { icon: Clock, title: 'Un modulo a settimana', desc: 'Contenuto progressivo: non tutto in una volta, ma al ritmo giusto per applicarlo davvero.' },
              { icon: CheckCircle, title: 'Accesso a vita', desc: 'Pagamento unico. Torna a consultarlo quando vuoi, per sempre.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: price card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-gray-400 text-sm mb-2">ACCESSO COMPLETO</p>
            <div className="text-6xl font-black text-white mb-1">€249</div>
            <p className="text-gray-500 text-sm mb-8">pagamento unico • accesso a vita</p>

            <ul className="text-left space-y-2 mb-8">
              {[
                '5 moduli × 4 lezioni = 20 lezioni',
                '~13 ore di contenuto',
                '20 worksheet PDF',
                'Modulo 1 subito dopo l\'acquisto',
                'Nessun abbonamento',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle size={14} className="text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/corso"
              className="flex items-center justify-center gap-2 w-full bg-primary text-white py-4 rounded-xl font-bold text-base hover:bg-orange-600 transition-colors">
              Scopri il Corso <ArrowRight size={18} />
            </a>
            <p className="text-gray-600 text-xs mt-3">
              Pagamento sicuro via PayPal
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}