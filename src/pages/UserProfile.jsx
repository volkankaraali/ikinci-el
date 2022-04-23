import React from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams();

  return (
    <div>UserProfile {username}</div>
  );
}

export default UserProfile;