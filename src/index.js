import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotifyComp from './components/Notify';
import ValidarMinhaCarteira from './Page/ValidarMinhaCarteira';
import NotFound from './Page/NotFound';
import Validacao from './Page/Validacao';
import Certificado from './Page/Certificado';
import PoliticaDePrivacidade from './Page/Termos/PoliticaDePrivacidade';
import TermosDeUso from './Page/Termos/TermosDeUso';
import MinhaCarteira from './Page/MinhaCarteira';
import ValidadorUEB from './Page/ValidadorUEB';
import ErrorPage from './Page/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ValidarMinhaCarteira />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/visualizaminhacarteira",
    element: <MinhaCarteira />, 
    errorElement: <ErrorPage />,
  },
  {
    path: "/validar/:email",
    element: <Validacao />,
    errorElement: <NotFound />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/certificado/:email",
    element: <Certificado />,
    errorElement: <NotFound />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/validar",
    element: <Validacao />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/certificado",
    element: <Certificado />,
    errorElement: <ErrorPage />,
  },
  {
    path: "validador/:cpf/:codUso",
    element: <ValidadorUEB />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/politica-de-privacidade",
    element: <PoliticaDePrivacidade />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/termos-de-uso",
    element: <TermosDeUso />,
    errorElement: <ErrorPage />
  },
  {
    path: "*", // Captura rotas inexistentes (404)
    element: <NotFound />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotifyComp />
    <RouterProvider router={router} />
  </React.StrictMode>
);

