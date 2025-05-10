import React from 'react';
import Navbar from '../pages/Navbar/Navbar';
import Footer from '../pages/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 160px)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
