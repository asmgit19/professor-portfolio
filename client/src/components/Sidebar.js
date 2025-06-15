import React from 'react';
import './Sidebar.css';

const Sidebar = ({ profile }) => {
  if (!profile) return <aside className="sidebar"></aside>;
  return (
    <aside className="sidebar">
      <div className="sidebar-profile-pic">
        <img
          src={
            profile.imageUrl
              ? profile.imageUrl.startsWith('http')
                ? profile.imageUrl
                : `http://localhost:5000${profile.imageUrl}`
              : 'http://localhost:5000/uploads/profilepic.jpg'
          }
          alt={profile.name}
        />
      </div>
      <h2 className="sidebar-name">{profile.name}</h2>
      <div className="sidebar-title">{profile.title}</div>
      <div className="sidebar-dept">{profile.department}</div>
      <div className="sidebar-uni">{profile.university}</div>
      <div className="sidebar-section">
        <h4>Areas of Expertise</h4>
        <div className="sidebar-badges">
          {profile.researchInterests?.map((interest, idx) => (
            <span className="sidebar-badge" key={idx}>{interest}</span>
          ))}
        </div>
      </div>
      <div className="sidebar-section">
        <h4>Connect</h4>
        <div className="sidebar-socials">
          {profile.socialLinks?.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.platform}
              className="sidebar-social-link"
            >
              <i className={link.iconClass}></i>
            </a>
          ))}
        </div>
      </div>
      <a
        href="#"
        className="sidebar-cv-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        View CV
      </a>
    </aside>
  );
};

export default Sidebar; 