import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotifyComp from './components/Notify';
import ValidarMinhaCarteira from './Page/ValidarMinhaCarteira';
import VisualizarMinhaCarteira from './Page/ValidarMinhaCarteira/VisualizarMinhaCarteira';
import NotFound from './Page/NotFound';
import Validacao from './Page/Validacao';
import Certificado from './Page/Certificado';
import PoliticaDePrivacidade from './Page/Termos/PoliticaDePrivacidade';
import TermosDeUso from './Page/Termos/TermosDeUso';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ValidarMinhaCarteira />,
  },
  {
    path: "/visualizaminhacarteira",
    element: <VisualizarMinhaCarteira />,
  },
   {
    path: "/validar/:email",
    element: <Validacao />,
    errorElement: <NotFound />
  },
  {
    path: "/certificado/:email",
    element: <Certificado />,
    errorElement: <NotFound />
  },
  {
    path: "/validar",
    element: <Validacao />,
    errorElement: <NotFound />
  },
  {
    path: "/certificado",
    element: <Certificado />,
    errorElement: <NotFound />
  },




  {
    path: "/politica-de-privacidade",
    element: <PoliticaDePrivacidade />,
    errorElement: <NotFound />
  },
  {
    path: "/termos-de-uso",
    element: <TermosDeUso />,
    errorElement: <NotFound />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotifyComp />
    <RouterProvider router={router} />
  </React.StrictMode>
);
 
