import React from 'react';
import './AppLayout.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
