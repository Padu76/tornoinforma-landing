'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Smartphone, Check, Sparkles, ChefHat, Calendar, ShoppingCart } from 'lucide-react'

const appFeatures = [
  {
    icon: ChefHat,
    title: '420+ Ricette Fitness',
    description: 'Database completo con ricette italiane ottimizzate per ogni obiettivo'
  },
  {
    icon: Calendar,
    title: 'Piano Nutrizionale Completo',
    description: 'Pianifica i tuoi pasti settimanali con calorie e macronutrienti precisi'
  },
  {
    icon: ShoppingCart,
    title: 'Lista Spesa Intelligente',
    description: 'Genera automaticamente la lista della spesa dal tuo piano alimentare'
  },
  {
    icon: Sparkles,
    title: 'AI Fitness Specializzata',
    description: 'Ricette generate con AI per atleti, nutrizionisti e preparatori atletici'
  }
]

export default function AppDownload() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
              <span className="gradient-text">MealPrep Planner</span><br />
              incluso nel programma
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              Rivoluziona la tua alimentazione con l'app dedicata: oltre 420 ricette fitness italiane, 
              piano nutrizionale personalizzato e lista spesa intelligente.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {[
                'Accesso completo alla versione Premium',
                'Piani personalizzati per perdita peso, aumento massa o mantenimento',
                'Ricette con macro dettagliati (proteine, carboidrati, grassi)',
                'Categorie unificate: colazione, pranzo, cena, smoothies e altro',
                'Sostituzione ingredienti intelligente',
                'Sincronizzazione con il tuo programma di allenamento'
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://mealprep-planner.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Prova MealPrep Planner
              </a>
              <a
                href="https://wa.me/3478881515?text=Ciao%20Andrea!%20Vorrei%20informazioni%20sul%20programma%20con%20MealPrep%20Planner"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
              >
                Richiedi Informazioni
              </a>
            </div>

            {/* Premium Badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-800">
                Accesso Premium incluso nel piano Standard e Premium
              </span>
            </div>
          </motion.div>

          {/* Right Column - App Screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Grid 2 colonne per gli screenshot */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Screenshot 1 - Piano Nutrizionale */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative"
                >
                  <div className="relative rounded-xl shadow-2xl overflow-hidden bg-white">
                    <Image
                      src="/app-mealprep-1.jpg"
                      alt="MealPrep Planner - Piano Nutrizionale"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>

                {/* Screenshot 2 - Ricette */}
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  className="relative mt-8"
                >
                  <div className="relative rounded-xl shadow-2xl overflow-hidden bg-white">
                    <Image
                      src="/app-mealprep-2.jpg"
                      alt="MealPrep Planner - Ricette Fitness"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Floating Stats */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
              >
                <div className="text-2xl font-bold text-primary">420+</div>
                <div className="text-xs text-gray-600">Ricette</div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
              >
                <div className="text-2xl font-bold text-primary">AI</div>
                <div className="text-xs text-gray-600">Powered</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}