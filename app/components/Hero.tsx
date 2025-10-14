'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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

    if (response.ok) {
      window.location.href = '/?success=1'
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
              />
              <button type="submit" className="btn-primary flex items-center justify-center gap-2">
                Ricevi l'Anteprima Gratis
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
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              {/* Layout a Z con spazi chiari */}
              <div className="relative space-y-8">
                
                {/* Prima immagine - in alto a sinistra */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative z-30"
                >
                  <Image
                    src="/app-pt.jpg"
                    alt="Condividi il percorso con il tuo PT"
                    width={180}
                    height={320}
                    className="rounded-2xl shadow-2xl"
                  />
                </motion.div>

                {/* Seconda immagine - al centro, leggermente spostata a destra */}
                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1.3 }}
                  className="relative z-20 ml-16 -mt-16"
                >
                  <Image
                    src="/app-progressi.jpg"
                    alt="Monitora i tuoi progressi"
                    width={180}
                    height={320}
                    className="rounded-2xl shadow-2xl"
                  />
                </motion.div>

                {/* Terza immagine - in basso al centro */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2.6 }}
                  className="relative z-10 ml-8 -mt-20"
                >
                  <Image
                    src="/app-workout.jpg"
                    alt="Allenati con il tuo smartphone"
                    width={180}
                    height={320}
                    className="rounded-2xl shadow-2xl"
                  />
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 -left-4 bg-white rounded-xl p-4 shadow-lg z-40"
              >
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Clienti</div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg z-40"
              >
                <div className="text-2xl font-bold text-primary">12 Sett</div>
                <div className="text-sm text-gray-600">Programma</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}