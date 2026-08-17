import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LanguageProvider } from './assets/LanguageContext'
import Layout from './assets/Layout.tsx'
import './App.css'

/* Page imports */
import Homepage from './pages/Homepage/Homepage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children : [
      { index: true, element: <Homepage /> },
    ],
  },
]);


function App() {
  return (
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
  );
}

export default App
