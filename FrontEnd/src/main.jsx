import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReportesProvider } from "./context/ReportesContext";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReportesProvider>
      <App />
    </ReportesProvider>
  </StrictMode>,
)

