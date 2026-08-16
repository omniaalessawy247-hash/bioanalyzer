import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App';
import Allhome from './Home/Allhome';
import Alllogin from './Login/Alllogin';
import Alluserprofile from './Userprofile/Alluserprofile';
import Allrefrence from './Refrence/Allrefrence';
import Allsequance from './D,Rsequance/Allsequance';
import Allabout from './About/Allabout';
import Allbio from './bio/Allbio';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Allhome />,
      },
      {
        path: 'about',
        element: <Allabout />,
      },
      {
        path: 'D,Rsequance',
        element: <Allsequance />,
      },
      {
        path: 'bio',
        element: <Allbio />,
      },
      {
        path: 'Refrence',
        element: <Allrefrence />,
      },
      {
        path: 'userprofile',
        element: <Alluserprofile />,
      },
      {
        path: 'login',
        element: <Alllogin />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);