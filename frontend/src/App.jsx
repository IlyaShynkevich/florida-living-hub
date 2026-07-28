import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import BottomNav from './components/BottomNav/BottomNav'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import HomePage from './pages/HomePage'
import BeachDetailPage from './pages/BeachDetailPage'
import UtilityCalculatorPage from './pages/UtilityCalculatorPage'
import AboutPage from './pages/AboutPage'
import BeachFinderPage from './pages/BeachFinderPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-wrapper">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Navbar />
        <main id="main-content" className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/beach-finder" element={<BeachFinderPage />} />
            {/* /beaches consolidated into /beach-finder — redirect so old links keep working */}
            <Route path="/beaches" element={<Navigate to="/beach-finder" replace />} />
            <Route path="/beaches/:id" element={<BeachDetailPage />} />
            <Route path="/calculator" element={<UtilityCalculatorPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
