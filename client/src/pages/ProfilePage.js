import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import Layout from '../components/Layout';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/v1/profile')
      .then(res => setProfile(res.data))
      .catch(err => setError('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data found.</div>;
  return (
    <Layout profile={profile}>
      <Profile profile={profile} />
    </Layout>
  );
};

export default ProfilePage; 