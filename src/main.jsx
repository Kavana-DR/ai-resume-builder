import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import PremiumLayout from './rb/PremiumLayout.jsx'
import StepPage from './rb/StepPage.jsx'
import ProofPage from './rb/Proof.jsx'

function AppRoutes() {
  const base = '/rb'
  const steps = [
    '01-problem',
    '02-market',
    '03-architecture',
    '04-hld',
    '05-lld',
    '06-build',
    '07-test',
    '08-ship',
  ]

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/rb/01-problem" replace />} />
        <Route path="/rb" element={<Navigate to="/rb/01-problem" replace />} />
        <Route path="/rb/proof" element={<PremiumLayout><ProofPage /></PremiumLayout>} />
        {steps.map((p, idx) => (
          <Route
            key={p}
            path={`/rb/${p}`}
            element={<PremiumLayout><StepPage step={idx + 1} slug={p} /></PremiumLayout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
