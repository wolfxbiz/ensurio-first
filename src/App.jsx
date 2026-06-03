import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './styles/tokens.css'
import './styles/responsive.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollReminderPopup from './components/ScrollReminderPopup'
import RiskManagementPage from './pages/RiskManagementPage'
import ManagementConsultancyPage from './pages/ManagementConsultancyPage'
import PrototypeHome from './prototype/home/index.jsx'

export default function App() {
  const location = useLocation()
  const isPrototype = location.pathname === '/' || location.pathname.startsWith('/prototype')

  return (
    <>
      {!isPrototype && <Navbar />}
      <Routes>
        <Route path="/" element={<PrototypeHome />} />
        <Route path="/risk-management" element={<RiskManagementPage />} />
        <Route path="/management-consultancy" element={<ManagementConsultancyPage />} />
      </Routes>
      {!isPrototype && <Footer />}
      {!isPrototype && <WhatsAppButton />}
      {!isPrototype && <ScrollReminderPopup />}
    </>
  )
}
