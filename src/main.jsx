import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Favourites from './components/Favourites.jsx'
import GlobalState from './context/index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Favourites',
        element: <Favourites />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <GlobalState>
    <RouterProvider router={router}>
      <StrictMode>
        <App />
      </StrictMode>,
    </RouterProvider>
  </GlobalState>
)
