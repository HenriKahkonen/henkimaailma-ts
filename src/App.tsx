import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'

/* Context imports */
import { LanguageProvider } from './assets/LanguageContext'
import { ChangelogProvider } from './assets/ChangelogContext.tsx'

import Layout from './assets/Layout.tsx'
import './App.css'

/* Page imports */
import Homepage from './pages/Homepage/Homepage'
import Metapage from './pages/Metapage/Metapage'
import Error404page from './pages/Errorpages/Error404page.tsx'
import Portfoliopage from './pages/Portfoliopage/Portfoliopage.tsx'
/*import Otherstuffpage from './pages/Otherstuffpage/otherstuffpage.tsx'*/
import Underconstructionpage from './pages/Underconstructionpage/underconstructionpage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children : [

      /* Homepage */
      { index: true, element: <Homepage /> },

      /* Portfolio page */
      { path: "/portfolio", element:
          <Portfoliopage />
      },

      /* Sounds and Scapes samplepacks */
      {
        path: "/sns", element:
        <Underconstructionpage heading="SnS samplepacks" />
      },

      /* Reviews */
      {
        path: "/arviot", element:
          <Underconstructionpage heading="Arviot" />
      },
      {
        path: "/reviews", element:
          <Underconstructionpage heading="Reviews" />
      },      

      /* Articles */
      {
        path: "/kirjoituksia", element:
          <Underconstructionpage heading="Kirjoituksia" />
      },
      {
        path: "/articles", element:
          <Underconstructionpage heading="Articles" />
      },      

      /* Music */
      {
        path: "/musiikki", element:
          <Underconstructionpage heading="Musiikki" />
      },
      {
        path: "/music", element:
          <Underconstructionpage heading="Music" />
      },

      /*Other stuff*/      
      {
        path: "/muuta", element:
          <Underconstructionpage heading="Other stuff" />
      },
      {
        path: "/other", element:
          <Underconstructionpage heading="Other stuff" />
      },

      /*Contact info and site changelog */
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
