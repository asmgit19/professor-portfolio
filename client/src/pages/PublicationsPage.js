import React, { useEffect, useState } from "react";
import Publications from "../components/Publications";
import Layout from "../components/Layout";
import axios from "axios";

const PublicationsPage = () => {
  const [publications, setPublications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/api/v1/profile"),
      axios.get("http://localhost:5000/api/v1/publications"),
    ])
      .then(([profileRes, pubsRes]) => {
        setProfile(profileRes.data);
        setPublications(pubsRes.data);
      })
      .catch((err) => setError("Failed to load publications"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!publications.length) return <div>No publications data found.</div>;
  return (
    <Layout profile={profile}>
      <Publications publications={publications} />
    </Layout>
  );
};

export default PublicationsPage;
