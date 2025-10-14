'use client'
import { motion } from 'framer-motion'
import { BookOpen, Download, Gift, ArrowRight } from 'lucide-react'
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
                <div className="text-lg font-bold text-primary">GRATIS</div>
                <div className="text-sm text-gray-600">Con ogni piano</div>
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
              Ricevi il Libro <span className="gradient-text">"Torno in Forma"</span> Gratis
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              La guida completa per la trasformazione fisica e mentale. 
              Strategie, mindset e tutti i segreti per risultati duraturi.
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

            <div className="space-y-4">
              <button className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Scarica l'Anteprima Gratis
              </button>
              
              <p className="text-sm text-gray-500">
                📚 Versione digitale immediata + cartacea con i piani Pro ed Elite
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}