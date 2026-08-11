import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// ✅ CSS بتاعك زي ما هو
import './index.css';

// ✅ Bootstrap (مهم جدًا للبرجر)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// الصفحات
import Allnavbar from './Home/Allnavbar';
import Allhome from './Home/Allhome';
import Allfooter from './Home/Allfooter';
import Alllogin from './Login/Alllogin';
import Alluserprofile from './Userprofile/Alluserprofile';
import Allrefrence from './Refrence/Allrefrence';
import Allsequance from './D,Rsequance/Allsequance';
import Allabout from './About/Allabout';
import Allbio from './bio/Allbio';

// ✅ Layout من غير أي تغيير في الشكل
const Layout = ({ children }) => {
  return (
    <>
      <Allnavbar />
      {children}
      <Allfooter />
    </>
  );
};

// ✅ Routes بدون تكرار أو مشاكل
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Allhome />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <Allabout />
      </Layout>
    ),
  },
  {
    path: "/D,Rsequance",
    element: (
      <Layout>
        <Allsequance />
      </Layout>
    ),
  },
  {
    path: "/bio",
    element: (
      <Layout>
        <Allbio />
      </Layout>
    ),
  },
  {
    path: "/Refrence",
    element: (
      <Layout>
        <Allrefrence />
      </Layout>
    ),
  },
  {
    path: "/userprofile",
    element: (
      <Layout>
        <Alluserprofile />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Alllogin />
      </Layout>
    ),
  },
]);

// ✅ render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);