import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import BottomNav from './components/BottomNav/BottomNav'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import HomePage from './pages/HomePage'
import BeachConditionsPage from './pages/BeachConditionsPage'
import BeachDetailPage from './pages/BeachDetailPage'
import UtilityCalculatorPage from './pages/UtilityCalculatorPage'
import AboutPage from './pages/AboutPage'
import BeachFinderPage from './pages/BeachFinderPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/beach-finder" element={<BeachFinderPage />} />
            <Route path="/beaches" element={<BeachConditionsPage />} />
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
