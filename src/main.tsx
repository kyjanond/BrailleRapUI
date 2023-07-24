import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './_style.scss'

ReactDOM.createRoot(document.getElementById('br-root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
