import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ profile }) => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="brand">
            {profile && <Link to="/">{profile.name}</Link>}
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/experience">Experience</Link></li>
            <li><Link to="/publications">Publications</Link></li>
            <li><Link to="/education">Education</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;