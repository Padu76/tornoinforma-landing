'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: "Marco R.",
    location: "Milano",
    result: "-12kg in 8 settimane",
    text: "Non credevo fosse possibile allenarsi da casa con risultati così evidenti. L'app è fantastica e il supporto costante mi ha motivato ogni giorno.",
    rating: 5,
    image: "/testimonial-1.jpg"
  },
  {
    name: "Giulia M.", 
    location: "Roma",
    result: "Ricomposizione corporea",
    text: "Il piano alimentare con Meal Prep Planner ha rivoluzionato il mio approccio al cibo. Risultati visibili già dopo 4 settimane!",
    rating: 5,
    image: "/testimonial-2.jpg"
  },
  {
    name: "Andrea T.",
    location: "Torino", 
    result: "+8kg massa magra",
    text: "Finalmente un programma che si adatta ai miei orari di lavoro. Fit Duel mi ha fatto divertire durante gli allenamenti.",
    rating: 5,
    image: "/testimonial-3.jpg"
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Storie di <span className="gradient-text">Successo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oltre 500 persone hanno già trasformato il loro corpo e la loro vita
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-orange-600/20"></div>
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                  <div className="text-sm text-primary font-semibold">{testimonial.result}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-600">Trasformazioni completate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
