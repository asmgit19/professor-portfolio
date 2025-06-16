import React, { useEffect, useState } from 'react';
import Experience from '../components/Experience';
import Layout from '../components/Layout';
import axios from 'axios';

const ExperiencePage = () => {
  const [experience, setExperience] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get('/api/v1/profile'),
      axios.get('/api/v1/experience')
    ])
      .then(([profileRes, expRes]) => {
        setProfile(profileRes.data);
        setExperience(expRes.data);
      })
      .catch(err => setError('Failed to load experience'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!experience.length) return <div>No experience data found.</div>;
  return (
    <Layout profile={profile}>
      <Experience experience={experience} />
    </Layout>
  );
};

export default ExperiencePage; 