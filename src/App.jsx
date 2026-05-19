import './styles/tokens.css'
import './styles/responsive.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollReminderPopup from './components/ScrollReminderPopup'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <AboutSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <ScrollReminderPopup />
    </>
  )
}
