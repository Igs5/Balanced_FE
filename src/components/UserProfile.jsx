import ProfilePictureUpload from './ProfilePictureUpload';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserProfile({ user, profilePicture, setProfilePicture }) {
  console.log(profilePicture);

  useEffect(() => {
    setProfilePicture(user?.profilePicture);
  }, [user]);

  return (
    <>
      <img
        src={profilePicture}
        alt='Profile'
        onClick={() =>
          document.getElementById('profile-picture-upload').click()
        }
        style={{ cursor: 'pointer' }}
        className='profile-image'
      />
      <Link to='/auth/updateProfile'>
        <button className='btn-see mb-6 mt-8'>My Profile</button>
      </Link>
      <ProfilePictureUpload setProfilePicture={setProfilePicture} />
    </>
  );
}

export default UserProfile;
