import React from 'react';

const User = ({ name, photo, brief }) => {
  return (
    <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg shadow-md">
      <img
        src={photo}
        alt={`Photo of ${name}`}
        className="w-24 h-24 rounded-full object-cover mb-4"
        loading="lazy"
      />
      <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate max-w-full">{name}</h2>
      <p className="text-gray-600 text-sm">{brief}</p>
    </div>
  );
};

export default User;
