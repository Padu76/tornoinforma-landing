'use client'
import { motion } from 'framer-motion'
import { BookOpen, Gift, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function BookBonus() {
  return (
    <section id="libro" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Book Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <Image
                src="/book-cover.jpg"
                alt="Libro Torno in Forma"
                width={400}
                height={600}
                className="rounded-2xl shadow-2xl mx-auto"
              />
              
              {/* Floating Badge */}
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-primary text-white rounded-full p-4 shadow-lg"
              >
                <Gift className="w-8 h-8" />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-8 -left-8 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-lg font-bold text-primary">INCLUSO</div>
                <div className="text-sm text-gray-600">Nei piani</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-primary font-semibold">BONUS ESCLUSIVO</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
              Ricevi il Libro <span className="gradient-text">"Torno in Forma"</span> in Regalo
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              La guida completa per la trasformazione fisica e mentale. 
              Incluso gratuitamente quando inizi il tuo percorso con noi.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold mb-2">Mindset della Trasformazione</h3>
                  <p className="text-gray-600">Come sviluppare la mentalità vincente per raggiungere i tuoi obiettivi</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold mb-2">Strategie Alimentari</h3>
                  <p className="text-gray-600">Principi nutrizionali e meal prep per sostenere i tuoi allenamenti</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold mb-2">Workout Avanzati</h3>
                  <p className="text-gray-600">Tecniche e programmazioni per massimizzare i risultati</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-xl p-6 mb-8">
              <h4 className="font-semibold text-lg mb-3">Come ottenerlo:</h4>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">📱</div>
                <span className="text-gray-700">Tutti i piani: Versione digitale inclusa</span>
              </div>
            </div>

            <div className="space-y-4">
              <a href="#piani" className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2">
                Inizia il Tuo Percorso
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <p className="text-sm text-gray-500">
                Il libro digitale è incluso gratuitamente in tutti i nostri piani di trasformazione
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}