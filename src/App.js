import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserList from './UserList';
import UserProfile from './UserProfile';
import AdminPanel from './AdminPanel';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">User Management</h1>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-500">Users</Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-500">Admin</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/:userId" element={<UserProfile />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white text-center p-4 text-sm text-gray-500 shadow-inner">
          © 2025 YourAppName. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
