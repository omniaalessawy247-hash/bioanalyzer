import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import App from './App';  
import Allnavbar from './Home/Allnavbar';
import Allhome from './Home/Allhome';
import Allfooter from './Home/Allfooter';
import Alllogin from './Login/Alllogin';
import Alluserprofile from './Userprofile/Alluserprofile';
import Allrefrence from './Refrence/Allrefrence';
import Allsequance from './D,Rsequance/Allsequance';
import Allabout from './About/Allabout';
import Allbio from './bio/Allbio';
 

 
 
 
 

const router = createBrowserRouter([
    {
        path: "/", 
        element: <App />,  
    },
    {
        path: "Home", 
        element: <Allnavbar />,  
    },
   
    {
        path: "Home", 
        element: <Allhome/>,  
    },
    {
        path: "Home", 
        element: <Allfooter/>,  
    },
    {
        path: "D,Rsequance", 
        element: <Allsequance/>,  
    },
    
    {
        path: "Login", 
        element: <Alllogin/>,  
    },
    {
        path: "Userprofile", 
        element: <Alluserprofile/>,  
    },
    {
        path: "Refrence", 
        element: <Allrefrence/>,  
    },
    
    {
        path: "About", 
        element: <Allabout/>,  
    },
    {
        path: "bio", 
        element: <Allbio/>,  
    },
   
   

    
]);

ReactDOM.createRoot(document.getElementById('root')).render(
        <RouterProvider router={router} />
       
);
