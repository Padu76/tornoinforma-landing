'use client'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer id="contatti" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Image 
              src="/logo.svg" 
              alt="Torno in Forma" 
              width={200} 
              height={50}
              className="h-12 w-auto mb-6"
            />
            <p className="text-gray-300 mb-6 max-w-md">
              Il percorso completo di trasformazione fisica online. 
              Allenamento personalizzato, nutrizione e coaching per risultati duraturi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="mailto:info@tornoinforma.it" className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              <li><a href="#come-funziona" className="text-gray-300 hover:text-primary transition-colors">Come Funziona</a></li>
              <li><a href="#piani" className="text-gray-300 hover:text-primary transition-colors">Piani</a></li>
              <li><a href="#libro" className="text-gray-300 hover:text-primary transition-colors">Libro Gratis</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-primary transition-colors">Termini di Servizio</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">Contatti</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@tornoinforma.it" className="text-gray-300 hover:text-primary transition-colors">
                  info@tornoinforma.it
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="https://wa.me/393478881515" className="text-gray-300 hover:text-primary transition-colors">
                  WhatsApp 347 888 1515
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-gray-300">Italia</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2024 Torno in Forma. Tutti i diritti riservati.</p>
        </motion.div>
      </div>
    </footer>
  )
}