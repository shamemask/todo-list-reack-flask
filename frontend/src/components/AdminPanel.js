import React, { useState } from 'react';

const AdminPanel = ({ onLogin, onLogout, isAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    onLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="admin-panel">
      {isAdmin && <button onClick={onLogout}>Logout</button>}
      {!isAdmin && (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;