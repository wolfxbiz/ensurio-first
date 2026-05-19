import { Routes, Route, Navigate } from 'react-router-dom'
import './styles/tokens.css'
import './styles/responsive.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollReminderPopup from './components/ScrollReminderPopup'
import RiskManagementPage from './pages/RiskManagementPage'
import ManagementConsultancyPage from './pages/ManagementConsultancyPage'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/risk-management" replace />} />
        <Route path="/risk-management" element={<RiskManagementPage />} />
        <Route path="/management-consultancy" element={<ManagementConsultancyPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <ScrollReminderPopup />
    </>
  )
}
