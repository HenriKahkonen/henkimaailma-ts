import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/* Context imports */
import { LanguageProvider } from './assets/LanguageContext'
import { ChangelogProvider } from './assets/ChangelogContext.tsx'

import Layout from './assets/Layout.tsx'
import './App.css'

/* Page imports */
import Homepage from './pages/Homepage/Homepage'
import Metapage from './pages/Metapage/Metapage'
import Error404page from './pages/Errorpages/Error404page.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children : [
      { index: true, element: <Homepage /> },
      { path: "/meta", element: 
          <Metapage />
      },
      { path: "*", element: <Error404page />,},
    ],
  },
]);


function App() {
  return (
      <ChangelogProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </ChangelogProvider>
  );
}

export default App
