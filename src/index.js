import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotifyComp from './components/Notify';
import ValidarMinhaCarteira from './Page/ValidarMinhaCarteira';
import VisualizarMinhaCarteira from './Page/ValidarMinhaCarteira/VisualizarMinhaCarteira';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ValidarMinhaCarteira />,
  },
  {
    path: "/visualizaminhacarteira",
    element: <VisualizarMinhaCarteira />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotifyComp />
    <RouterProvider router={router} />
  </React.StrictMode>
);
 
