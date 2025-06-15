import React from 'react';

const Footer = ({ profile }) => {
  if (!profile) return null;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="contact-info">
            <h3>Contact</h3>
            <p>{profile.email}</p>
            {profile.phone && <p>{profile.phone}</p>}
            {profile.address && <p>{profile.address}</p>}
          </div>
          <div className="social-links">
            <h3>Connect</h3>
            <div className="social-icons">
              {profile.socialLinks?.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                >
                  <i className={link.iconClass}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;