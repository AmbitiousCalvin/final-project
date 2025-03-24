import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LayoutProvider } from "./contexts/layoutContext";
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LayoutProvider>
        <App />
    </LayoutProvider>
  </StrictMode>,
)
