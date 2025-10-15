'use client'
import { motion } from 'framer-motion'
import { ClipboardCheck } from 'lucide-react'

export default function QuizSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <ClipboardCheck className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
            Scopri il tuo livello di forma:<br />
            <span className="gradient-text">fai ora il test fitness</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rispondi a 20 domande e ricevi un report personalizzato con il tuo stato attuale 
            e consigli specifici per migliorare
          </p>
        </motion.div>

        {/* Quiz iFrame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <iframe
              src="https://www.andreapadoan.it/quiz.html"
              title="Quiz Fitness - Scopri il tuo livello"
              className="w-full h-[600px] border-0"
              loading="lazy"
              allow="clipboard-write"
            />
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Solo 2 minuti</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Report personalizzato</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>100% gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Oltre 2.500 test completati</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}