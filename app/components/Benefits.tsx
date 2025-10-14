'use client'
import { motion } from 'framer-motion'
import { Home, Dumbbell, Watch, Smartphone, Heart, Users } from 'lucide-react'
import Image from 'next/image'

const benefits = [
  {
    icon: Home,
    title: "Allenati Ovunque",
    description: "Programmi per casa, palestra o outdoor con pochi attrezzi"
  },
  {
    icon: Smartphone,
    title: "App Integrate",
    description: "Meal Prep Planner e Fit Duel per supporto completo"
  },
  {
    icon: Watch,
    title: "Piani Flessibili",
    description: "Adattabili ai tuoi orari e disponibilità di tempo"
  },
  {
    icon: Heart,
    title: "Coaching Personale",
    description: "Supporto diretto e monitoraggio dei progressi"
  },
  {
    icon: Users,
    title: "Community Attiva",
    description: "Condividi il percorso con altri utenti motivati"
  },
  {
    icon: Dumbbell,
    title: "Risultati Garantiti",
    description: "Metodo testato su oltre 500 trasformazioni"
  }
]

export default function Benefits() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-8">
              Perché Scegliere <span className="gradient-text">Torno in Forma</span>
            </h2>
            
            <div className="grid gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="bg-gradient-to-br from-primary/20 to-orange-600/20 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <div className="w-8 h-8 bg-primary rounded-lg mb-2"></div>
                      <div className="text-sm font-semibold">App Training</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-lg mb-2"></div>
                      <div className="text-sm font-semibold">Meal Prep</div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg mb-2"></div>
                      <div className="text-sm font-semibold">Fit Duel</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg mb-2"></div>
                      <div className="text-sm font-semibold">Progress</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-gray-600">Soddisfazione</div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Supporto</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
