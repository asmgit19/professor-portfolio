import React from 'react';

const Education = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="section">
      <div className="container">
        <h2>Education</h2>
        <div className="education-list">
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.degree}</h3>
              <h4>{edu.institution}</h4>
              <p className="duration">{edu.year}</p>
              {edu.description && <p className="description">{edu.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;