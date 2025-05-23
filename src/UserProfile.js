import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import { Oval } from 'react-loader-spinner';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://usermanagement-backend-kx60.onrender.com/api/users/${userId}`);
        if (!response.ok) throw new Error(`Failed to fetch user. Status: ${response.status}`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval height={50} width={50} color="blue" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 font-semibold">
        <p>Error: {error}</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 font-medium">
        <p>User not found.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Profile
        name={user.name}
        photo={user.photo}
        brief={user.brief}
        contact={user.contact}
        interests={user.interests}
        latitude={user.contact.latitude}
        longitude={user.contact.longitude}
      />
    </div>
  );
};

export default UserProfile;
