import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ profile, children }) => {
  return (
    <div className="layout-container">
      <Sidebar profile={profile} />
      <div className="main-area">
        <Header profile={profile} />
        <main className="main-content">{children}</main>
        <Footer profile={profile} />
      </div>
    </div>
  );
};

export default Layout; 