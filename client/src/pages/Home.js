import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import Publications from '../components/Publications';
import Education from '../components/Education';
import Experience from '../components/Experience';
import '../App.css';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [publications, setPublications] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Test backend connection first
        const healthCheck = await axios.get('/api/health');
        console.log('Backend health:', healthCheck.data);

        const BASE_API_URL = '/api/v1';

        const endpoints = [
          '/profile',
          '/publications',
          '/education',
          '/experience'
        ];
        
        const responses = await Promise.all(
          endpoints.map(endpoint => 
            axios.get(`${BASE_API_URL}${endpoint}`)
              .then(res => {
                console.log(`Data from ${endpoint}:`, res.data);
                return res;
              })
              .catch(err => {
                console.error(`Error fetching ${endpoint}:`, err);
                throw err; // Re-throw to trigger catch block
              })
          )
        );

        setProfile(responses[0].data);
        setPublications(responses[1].data || []);
        setEducation(responses[2].data || []);
        setExperience(responses[3].data || []);
        
      } catch (err) {
        const errorMsg = err.response 
          ? `Server error: ${err.response.status} - ${err.response.data.message || 'No details'}`
          : `Network error: ${err.message}`;
        
        console.error('Full error details:', {
          error: err,
          config: err.config,
          response: err.response
        });
        
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const response = await axios.patch(
        '/api/profile', 
        updatedProfile
      );
      setProfile(response.data);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading portfolio data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="no-data">
        <h2>No Profile Data Found</h2>
        <p>Please check your database connection</p>
      </div>
    );
  }

  return (
    <Layout profile={profile}>
      {/* The Profile component is removed from the Home page to avoid duplication. */}
      {/* Its information is now primarily displayed in the sidebar. */}
      
      <Experience experience={experience} />
      
      <Publications publications={publications} />
      
      <Education education={education} />
    </Layout>
  );
};

export default Home;