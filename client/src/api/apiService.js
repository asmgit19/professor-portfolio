import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const fetchProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.patch(`${API_URL}/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const fetchPublications = async () => {
  try {
    const response = await axios.get(`${API_URL}/publications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw error;
  }
};