'use client'
import { motion } from 'framer-motion'
import { Check, Star, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: "Start",
    duration: "4 settimane",
    price: "€99",
    popular: false,
    features: [
      "Piano allenamento personalizzato",
      "Piano alimentare base",
      "Accesso app Torno in Forma",
      "1 check iniziale",
      "Libro digitale GRATIS"
    ]
  },
  {
    name: "Pro",
    duration: "8 settimane", 
    price: "€179",
    popular: true,
    features: [
      "Piano allenamento completo",
      "Piano alimentare avanzato",
      "Accesso app + Meal Prep Planner",
      "2 revisioni programma",
      "Chat diretta con coach",
      "Libro digitale GRATIS",
      "Accesso Fit Duel"
    ]
  },
  {
    name: "Elite",
    duration: "12 settimane",
    price: "€249",
    popular: false,
    features: [
      "Tutto del piano Pro",
      "Coaching continuo personalizzato",
      "Revisioni illimitate",
      "Chiamate mensili",
      "Supporto prioritario",
      "Libro digitale GRATIS",
      "Community VIP"
    ]
  }
]

export default function Plans() {
  return (
    <section id="piani" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Scegli il Tuo <span className="gradient-text">Percorso</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tre opzioni per adattarsi perfettamente ai tuoi obiettivi e al tuo budget
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Più Scelto
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                  <div className="text-gray-600">{plan.duration}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular 
                    ? 'bg-primary text-white hover:bg-orange-600 hover:scale-105' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Inizia Ora
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
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
            Non sei sicuro quale piano scegliere?
          </p>
          <a href="#contatti" className="btn-secondary">
            Richiedi Consulenza Gratuita
          </a>
        </motion.div>
      </div>
    </section>
  )
}