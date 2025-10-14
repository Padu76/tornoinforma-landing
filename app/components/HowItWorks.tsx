'use client'
import { motion } from 'framer-motion'
import { ClipboardList, Dumbbell, Smartphone, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: "1. Valutazione Iniziale",
    description: "Compili il questionario per definire obiettivi, livello e disponibilità di tempo."
  },
  {
    icon: Dumbbell,
    title: "2. Piano Personalizzato",
    description: "Ricevi il tuo programma di allenamento e piano alimentare su misura."
  },
  {
    icon: Smartphone,
    title: "3. App e Strumenti",
    description: "Accedi alle app Meal Prep Planner e Fit Duel per il supporto completo."
  },
  {
    icon: TrendingUp,
    title: "4. Monitora e Migliora",
    description: "Segui i progressi e ricevi coaching continuo per raggiungere i tuoi obiettivi."
  }
]

export default function HowItWorks() {
  return (
    <section id="come-funziona" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Come Funziona il <span className="gradient-text">Metodo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un percorso semplice e strutturato per la tua trasformazione completa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-gray-300 transform -translate-x-10" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
