'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image 
              src="/logo.svg" 
              alt="Torno in Forma" 
              width={180} 
              height={40}
              className="h-8 w-auto"
            />
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#come-funziona" className="hover:text-primary transition-colors">Come funziona</a>
              <a href="#piani" className="hover:text-primary transition-colors">Piani</a>
              <a href="#libro" className="hover:text-primary transition-colors">Libro Gratis</a>
              <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
              <a href="#inizia" className="btn-primary ml-4">Inizia Ora</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#come-funziona" className="block px-3 py-2 hover:text-primary">Come funziona</a>
            <a href="#piani" className="block px-3 py-2 hover:text-primary">Piani</a>
            <a href="#libro" className="block px-3 py-2 hover:text-primary">Libro Gratis</a>
            <a href="#faq" className="block px-3 py-2 hover:text-primary">FAQ</a>
            <a href="#inizia" className="block btn-primary m-3 text-center">Inizia Ora</a>
          </div>
        </div>
      )}
    </nav>
  )
}