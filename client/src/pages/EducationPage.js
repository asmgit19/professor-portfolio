import React, { useEffect, useState } from "react";
import Education from "../components/Education";
import Layout from "../components/Layout";
import axios from "axios";

const EducationPage = () => {
  const [education, setEducation] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/api/v1/profile"),
      axios.get("http://localhost:5000/api/v1/education"),
    ])
      .then(([profileRes, eduRes]) => {
        setProfile(profileRes.data);
        setEducation(eduRes.data);
      })
      .catch((err) => setError("Failed to load education"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!education.length) return <div>No education data found.</div>;
  return (
    <Layout profile={profile}>
      <Education education={education} />
    </Layout>
  );
};

export default EducationPage;
