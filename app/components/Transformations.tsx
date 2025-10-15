'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { TrendingUp, Award, Users } from 'lucide-react'

const transformations = [
  { id: 1, duration: '12 settimane' },
  { id: 2, duration: '12 settimane' },
  { id: 3, duration: '12 settimane' },
  { id: 4, duration: '12 settimane' },
  { id: 5, duration: '12 settimane' },
  { id: 6, duration: '12 settimane' },
  { id: 7, duration: '12 settimane' },
  { id: 8, duration: '12 settimane' },
  { id: 9, duration: '12 settimane' },
  { id: 10, duration: '12 settimane' },
]

export default function Transformations() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            <span className="gradient-text">Oltre 500 persone</span><br />
            hanno già trasformato il loro corpo
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Risultati reali di clienti reali. Nessun fotoritocco, solo impegno e il programma giusto.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Trasformazioni</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">12 sett</div>
                <div className="text-sm text-gray-600">Media programma</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Soddisfazione</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transformations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {transformations.map((transformation, index) => (
            <motion.div
              key={transformation.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full h-auto">
                <Image
                  src={`/transformations/transformation-${transformation.id}.jpg`}
                  alt={`Trasformazione cliente ${transformation.id}`}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Overlay con durata */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3">
                      <div className="text-sm font-semibold text-primary mb-1">
                        Risultato in {transformation.duration}
                      </div>
                      <div className="text-xs text-gray-600">
                        Programma personalizzato + coaching online
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {transformation.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Vuoi essere il prossimo?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Inizia oggi il tuo percorso di trasformazione con un programma personalizzato 
              e il supporto di un personal trainer dedicato
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/3478881515?text=Ciao%20Andrea!%20Ho%20visto%20le%20trasformazioni%20su%20TornoInForma%20e%20vorrei%20iniziare%20anche%20io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Inizia la Tua Trasformazione
              </a>
              <button
                onClick={() => document.getElementById('quizScreen')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white"
              >
                Fai il Test Fitness Gratuito
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}