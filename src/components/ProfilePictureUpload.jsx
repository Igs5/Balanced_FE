import { useState, useEffect } from 'react';
import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const ProfilePictureUpload = ({ setProfilePicture }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${url}/api/auth/profile-picture/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfilePicture(response.data.profilePicture);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div>
      <input
        id='profile-picture-upload'
        type='file'
        name='profilePicture'
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ProfilePictureUpload;
