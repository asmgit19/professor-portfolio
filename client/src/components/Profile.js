import React from 'react';

const Profile = ({ profile }) => {
  if (!profile) return null;

  return (
    <section id="profile" className="section">
      <div className="container">
        <div className="profile-grid">
          <div className="profile-image">
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
          <div className="profile-info">
            <h1>{profile.name}</h1>
            <h2>{profile.title}</h2>
            <h3>{profile.department}, {profile.university}</h3>
            
            <div className="contact-info">
              <p><i className="fas fa-envelope"></i> {profile.email}</p>
              {profile.phone && <p><i className="fas fa-phone"></i> {profile.phone}</p>}
              {profile.address && <p><i className="fas fa-map-marker-alt"></i> {profile.address}</p>}
            </div>

            <div className="social-links">
              {profile.socialLinks?.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                  <i className={link.iconClass}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="about-section">
          <h3>About</h3>
          <p>{profile.about}</p>
        </div>

        {profile.researchInterests?.length > 0 && (
          <div className="research-interests">
            <h3>Research Interests</h3>
            <ul>
              {profile.researchInterests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;