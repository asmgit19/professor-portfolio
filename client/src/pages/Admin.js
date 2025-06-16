import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({
    section: 'profile',
    data: {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/${formData.section}`, formData.data);
      alert('Updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating data');
    }
  };

  return (
    <div className="admin-panel">
      <h1>Portfolio Admin</h1>
      <form onSubmit={handleSubmit}>
        <select 
          value={formData.section}
          onChange={(e) => setFormData({...formData, section: e.target.value})}
        >
          <option value="profile">Profile</option>
          <option value="publications">Publications</option>
          <option value="education">Education</option>
          <option value="experience">Experience</option>
        </select>

        {/* Dynamic form fields based on selected section */}
        {formData.section === 'profile' && (
          <div>
            <input 
              type="text" 
              placeholder="Name"
              onChange={(e) => setFormData({
                ...formData, 
                data: {...formData.data, name: e.target.value}
              })}
            />
            {/* Add more profile fields */}
          </div>
        )}
        
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Admin;