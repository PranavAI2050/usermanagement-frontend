import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import User from './User';
import UserMap from './UserMap';
import { Oval } from 'react-loader-spinner';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({ latitude: null, longitude: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [loading, setLoading] = useState(true);

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchQuery.trim()) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedInterest) {
      filtered = filtered.filter(user =>
        user.interests.includes(selectedInterest)
      );
    }

    setFilteredUsers(filtered);
  }, [searchQuery, selectedInterest, users]);

  const handleShowOnMap = (latitude, longitude) => {
    setSelectedLocation({ latitude, longitude });
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const uniqueInterests = Array.from(new Set(users.flatMap(u => u.interests)));

  if (error) return <div className="text-red-600 text-center mt-4">Error: {error}</div>;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full md:w-1/3"
        />
        <select
          value={selectedInterest}
          onChange={(e) => setSelectedInterest(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full md:w-1/3"
        >
          <option value="">Filter by Interest</option>
          {uniqueInterests.map((interest, idx) => (
            <option key={idx} value={interest}>{interest}</option>
          ))}
        </select>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-32">
          <Oval height={40} width={40} color="blue" />
        </div>
      )}

      {/* Users */}
      {!loading && filteredUsers.length === 0 && (
        <p className="text-center text-gray-500">No users match your filter.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow p-4 flex flex-col justify-between space-y-4">
            <User name={user.name} photo={user.photo} brief={user.brief} />

            <div className="flex justify-between items-center">
              <button
                onClick={() => handleShowOnMap(user.contact.latitude, user.contact.longitude)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Show on Map
              </button>
              <Link
                to={`/${user.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View Full Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div ref={mapRef} className="mt-10">
        <UserMap latitude={selectedLocation.latitude} longitude={selectedLocation.longitude} />
      </div>
    </div>
  );
};

export default UserList;
