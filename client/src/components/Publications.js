import React, { useState } from 'react';

const Publications = ({ publications }) => {
  const [filter, setFilter] = useState('all');

  if (!publications || publications.length === 0) return null;

  const filteredPublications = filter === 'all' 
    ? publications 
    : publications.filter(pub => pub.category === filter);

  const categories = [...new Set(publications.map(pub => pub.category))];

  return (
    <section id="publications" className="section">
      <div className="container">
        <h2>Publications</h2>
        
        <div className="publication-filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              className={filter === category ? 'active' : ''}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="publication-list">
          {filteredPublications.map((pub, index) => (
            <div key={index} className="publication-item">
              <h3>{pub.title}</h3>
              <p className="authors">{pub.authors.join(', ')}</p>
              <p className="journal">{pub.journal}, {pub.year}</p>
              {pub.doi && (
                <a 
                  href={`https://doi.org/${pub.doi}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="doi-link"
                >
                  DOI: {pub.doi}
                </a>
              )}
              {pub.link && (
                <a 
                  href={pub.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  View Publication
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;