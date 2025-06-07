import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '/src/modules/App.jsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
   
  </StrictMode>,
)
