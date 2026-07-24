import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/fraunces'
import './styles.css'
import './site.css'
import { captureAttribution } from './lib/tracking'
import App from './App'

// Capture UTM/fbclid BEFORE first render so outbound links (estimator,
// checkout) are built with the ad's attribution, not the organic fallback.
captureAttribution()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
