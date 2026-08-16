import React from 'react';
import Allnavbar from './Home/Allnavbar';
import Allfooter from './Home/Allfooter';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Allnavbar />
      <Outlet />
      <Allfooter />
    </>
  );
}

export default App;