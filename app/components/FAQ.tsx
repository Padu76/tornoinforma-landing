'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "Posso allenarmi senza attrezzi?",
    answer: "Assolutamente sì! Abbiamo programmi specifici per allenamento a corpo libero e con attrezzature minime. Puoi scegliere tra: Home Training (senza attrezzi), Gym Training (palestra completa) o Minimal Training (elastici e manubri)."
  },
  {
    question: "Come funziona l'accesso alle app?",
    answer: "Una volta acquistato il piano, riceverai le credenziali per accedere all'app Torno in Forma, Meal Prep Planner e Fit Duel. Tutto è integrato per un'esperienza seamless."
  },
  {
    question: "Il libro è incluso in tutti i piani?",
    answer: "Sì, il libro 'Torno in Forma' è incluso in tutti i piani. Nel piano Start ricevi la versione digitale, nei piani Pro ed Elite anche la versione cartacea spedita a casa."
  },
  {
    question: "Quanto tempo richiede ogni allenamento?",
    answer: "Gli allenamenti sono progettati per durare tra i 30 e i 60 minuti, adattabili in base al tuo livello e disponibilità di tempo. Puoi personalizzare la durata durante la valutazione iniziale."
  },
  {
    question: "Posso cambiare piano durante il percorso?",
    answer: "Certamente! Puoi sempre fare l'upgrade del tuo piano per accedere a più funzionalità e supporto. Contattaci per le opzioni di cambio piano."
  },
  {
    question: "C'è una garanzia sui risultati?",
    answer: "Offriamo garanzia soddisfatti o rimborsati entro 14 giorni dall'acquisto. Siamo sicuri della qualità del nostro metodo, testato su oltre 500 persone."
  }
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Domande <span className="gradient-text">Frequenti</span>
          </h2>
          <p className="text-xl text-gray-600">
            Tutto quello che devi sapere su Torno in Forma
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {activeIndex === index ? (
                  <Minus className="w-5 h-5 text-primary" />
                ) : (
                  <Plus className="w-5 h-5 text-primary" />
                )}
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Non hai trovato la risposta che cercavi?
          </p>
          <a href="#contatti" className="btn-primary">
            Contattaci Direttamente
          </a>
        </motion.div>
      </div>
    </section>
  )
}