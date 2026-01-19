import { SpeedInsights } from '@vercel/speed-insights/react'
import Hero from './components/Hero'
import Toolbox from './components/Toolbox'
import Experience from './components/Experience'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Toolbox />
      <Experience />
      <ContactForm />
      <Footer />
      <SpeedInsights />
    </div>
  )
}

export default App
