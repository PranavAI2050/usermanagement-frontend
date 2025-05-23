import React from 'react';
import UserMap from './UserMap';

const Profile = ({ name, photo, brief, contact, interests, latitude, longitude }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
        <img
          src={photo}
          alt={`Photo of ${name}`}
          className="w-32 h-32 rounded-full object-cover shadow-md"
          loading="lazy"
        />
        <div className="text-center sm:text-left flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 truncate">{name}</h2>
          <p className="text-gray-700 mb-4"><strong>About:</strong> {brief}</p>
          <div className="space-y-1 text-gray-600 text-sm">
            <p><strong>Email:</strong> <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a></p>
            <p><strong>Phone:</strong> <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">{contact.phone}</a></p>
            <p><strong>Location:</strong> {contact.location}</p>
          </div>
          <div className="mt-4">
            <strong className="text-gray-800">Interests:</strong>
            <ul className="list-disc list-inside mt-1 text-gray-700">
              {interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <UserMap latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
};

export default Profile;
