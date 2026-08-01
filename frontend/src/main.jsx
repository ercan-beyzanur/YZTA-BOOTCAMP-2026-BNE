import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import store from './store'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{ duration: 3000 }}
          />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
