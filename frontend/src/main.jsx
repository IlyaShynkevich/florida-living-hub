import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// iOS Safari only applies :active styles while a touch is down if the document
// has a touchstart listener. Without this, every :active rule in the app is
// dead on iPhone/iPad — the tap feedback simply never appears. The handler is
// intentionally empty; registering it is the entire point. Passive so it can
// never delay scrolling.
document.addEventListener('touchstart', () => {}, { passive: true })

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
