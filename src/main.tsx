
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { Toaster } from './components/ui/sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
      <Toaster position="bottom-right" />
    </ThemeProvider>
  </React.StrictMode>,
)
