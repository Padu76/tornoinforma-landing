import Navbar from './components/Navbar'
import Hero from './components/Hero'
import QuizSection from './components/QuizSection'
import Transformations from './components/Transformations'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import AppDownload from './components/AppDownload'
import Plans from './components/Plans'
import BookBonus from './components/BookBonus'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <QuizSection />
      <Transformations />
      <HowItWorks />
      <Benefits />
      <AppDownload />
      <Plans />
      <BookBonus />
      <Testimonials />
      <FAQ />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}