import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-16 container">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
