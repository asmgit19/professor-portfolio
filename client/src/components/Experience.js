import React from 'react';

const Experience = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2>Professional Experience</h2>
        <div className="experience-list">
          {experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="exp-header">
                <h3>{exp.position}</h3>
                <span className="institution">{exp.institution}</span>
                <span className={`duration ${exp.current ? 'current' : ''}`}>
                  {exp.duration} {exp.current && '(Current)'}
                </span>
              </div>
              <ul className="exp-description">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;