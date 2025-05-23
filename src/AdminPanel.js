import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    photo: '',
    brief: '',
    contact: { email: '', phone: '', location: '', latitude: 0, longitude: 0 },
    interests: [],
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch('https://usermanagement-backend-kx60.onrender.com/api/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }));
    } else if (name === 'interests') {
      setForm((prev) => ({ ...prev, interests: value.split(',').map((s) => s.trim()) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch('https://usermanagement-backend-kx60.onrender.com/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add user');
      await fetchUsers();
      setForm({
        name: '',
        photo: '',
        brief: '',
        contact: { email: '', phone: '', location: '', latitude: 0, longitude: 0 },
        interests: [],
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingUserId(user.id);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://usermanagement-backend-kx60.onrender.com/api/users/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update user');
      await fetchUsers();
      setEditingUserId(null);
      setForm({
        name: '',
        photo: '',
        brief: '',
        contact: { email: '', phone: '', location: '', latitude: 0, longitude: 0 },
        interests: [],
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://usermanagement-backend-kx60.onrender.com/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center">Admin Panel - Profile Management</h1>

      {error && (
        <p className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">{error}</p>
      )}

      <div className="mb-8 border border-gray-300 rounded p-6 bg-gray-50 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          {editingUserId ? 'Edit User' : 'Add User'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="input-field"
          />
          <input
            name="photo"
            value={form.photo}
            onChange={handleInputChange}
            placeholder="Photo URL"
            className="input-field"
          />
          <input
            name="brief"
            value={form.brief}
            onChange={handleInputChange}
            placeholder="Brief"
            className="input-field md:col-span-2"
          />

          <input
            name="contact.email"
            value={form.contact.email}
            onChange={handleInputChange}
            placeholder="Email"
            type="email"
            className="input-field"
          />
          <input
            name="contact.phone"
            value={form.contact.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            type="tel"
            className="input-field"
          />
          <input
            name="contact.location"
            value={form.contact.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="input-field"
          />
          <input
            name="contact.latitude"
            type="number"
            value={form.contact.latitude}
            onChange={handleInputChange}
            placeholder="Latitude"
            className="input-field"
          />
          <input
            name="contact.longitude"
            type="number"
            value={form.contact.longitude}
            onChange={handleInputChange}
            placeholder="Longitude"
            className="input-field"
          />

          <input
            name="interests"
            value={form.interests.join(', ')}
            onChange={handleInputChange}
            placeholder="Interests (comma separated)"
            className="input-field md:col-span-2"
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          {editingUserId && (
            <button
              onClick={() => {
                setEditingUserId(null);
                setForm({
                  name: '',
                  photo: '',
                  brief: '',
                  contact: { email: '', phone: '', location: '', latitude: 0, longitude: 0 },
                  interests: [],
                });
                setError(null);
              }}
              className="btn-cancel"
            >
              Cancel
            </button>
          )}
          <button
            onClick={editingUserId ? handleUpdate : handleAdd}
            className="btn-submit"
          >
            {editingUserId ? 'Update User' : 'Add User'}
          </button>
        </div>
      </div>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-4">Existing Users</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm"
          >
            <span className="font-medium text-gray-800">{user.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db; /* Tailwind gray-300 */
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: #3b82f6; /* Tailwind blue-500 */
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        .btn-submit {
          background-color: #2563eb; /* Tailwind blue-600 */
          color: white;
          padding: 0.5rem 1.25rem;
          font-weight: 600;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .btn-submit:hover {
          background-color: #1d4ed8; /* Tailwind blue-700 */
          cursor: pointer;
        }
        .btn-cancel {
          background-color: #e5e7eb; /* Tailwind gray-200 */
          color: #374151; /* Tailwind gray-700 */
          padding: 0.5rem 1.25rem;
          font-weight: 600;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .btn-cancel:hover {
          background-color: #d1d5db; /* Tailwind gray-300 */
          cursor: pointer;
        }
        .btn-edit {
          background-color: #fbbf24; /* Tailwind yellow-400 */
          color: #92400e; /* Tailwind yellow-800 */
          padding: 0.3rem 0.75rem;
          font-weight: 600;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .btn-edit:hover {
          background-color: #f59e0b; /* Tailwind yellow-500 */
          cursor: pointer;
        }
        .btn-delete {
          background-color: #ef4444; /* Tailwind red-500 */
          color: white;
          padding: 0.3rem 0.75rem;
          font-weight: 600;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .btn-delete:hover {
          background-color: #dc2626; /* Tailwind red-600 */
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
