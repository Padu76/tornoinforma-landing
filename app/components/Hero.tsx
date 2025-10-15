'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // 1. Salva il lead su Supabase
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'hero_cta',
          utm: typeof window !== 'undefined' ? 
            JSON.parse(localStorage.getItem('utm') || '{}') : {}
        })
      })

      const result = await response.json()

      if (response.ok) {
        // 2. Se il salvataggio è riuscito, invia email tramite EmailJS
        try {
          // Carica EmailJS dinamicamente
          const emailjs = await import('@emailjs/browser')
          
          await emailjs.send(
            'service_v6bw2m4', // SERVICE_ID
            'template_i605n5c', // TEMPLATE_ID
            {
              user_email: email,
              user_name: 'Caro/a',
              to_email: email
            },
            'ME0ru3KkNko0P6d2Y' // PUBLIC_KEY
          )
          
          console.log('Email sent successfully')
        } catch (emailError) {
          console.error('Email sending failed:', emailError)
          // Non bloccare il flusso per errori email
        }

        // Redirect alla pagina di successo
        window.location.href = '/?success=1'
      } else {
        alert('Errore durante il salvataggio. Riprova.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Errore di connessione. Riprova.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/hero-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:pr-8"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">Oltre 500+ trasformazioni</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              <span className="gradient-text">Torna in Forma</span><br />
              <span className="text-gray-900">ovunque ti trovi</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Il percorso completo di trasformazione fisica: allenamento personalizzato, 
              piano alimentare e coaching online. Con l'app dedicata e il libro in regalo.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email per iniziare"
                className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Invio...' : 'Ricevi l\'Anteprima Gratis'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                ✅ Anteprima libro gratuita
              </div>
              <div className="flex items-center gap-2">
                ✅ Valutazione personalizzata
              </div>
              <div className="flex items-center gap-2">
                ✅ Accesso alle app incluse
              </div>
            </div>
          </motion.div>

          {/* Right Column - App Screenshots */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Grid orizzontale 3 colonne */}
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                
                {/* Prima immagine */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative"
                >
                  <Image
                    src="/app-pt.jpg"
                    alt="Condividi il percorso con il tuo PT"
                    width={140}
                    height={280}
                    className="rounded-xl shadow-xl"
                  />
                </motion.div>

                {/* Seconda immagine */}
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="relative"
                >
                  <Image
                    src="/app-progressi.jpg"
                    alt="Monitora i tuoi progressi"
                    width={140}
                    height={280}
                    className="rounded-xl shadow-xl"
                  />
                </motion.div>

                {/* Terza immagine */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  className="relative"
                >
                  <Image
                    src="/app-workout.jpg"
                    alt="Allenati con il tuo smartphone"
                    width={140}
                    height={280}
                    className="rounded-xl shadow-xl"
                  />
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg"
              >
                <div className="text-xl font-bold text-primary">500+</div>
                <div className="text-xs text-gray-600">Clienti</div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg"
              >
                <div className="text-xl font-bold text-primary">12 Sett</div>
                <div className="text-xs text-gray-600">Programma</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}