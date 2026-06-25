import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage'
import BeachConditionsPage from './pages/BeachConditionsPage'
import BeachDetailPage from './pages/BeachDetailPage'
import UtilityCalculatorPage from './pages/UtilityCalculatorPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/beaches" element={<BeachConditionsPage />} />
            <Route path="/beaches/:id" element={<BeachDetailPage />} />
            <Route path="/calculator" element={<UtilityCalculatorPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
