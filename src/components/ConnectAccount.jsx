import React, { useState } from 'react';
import { connectAccount } from './authService';

const ConnectAccount = ({ platform }) => {
  const [authCode, setAuthCode] = useState('');

  const handleConnect = async () => {
    try {
      const token = await connectAccount(platform, authCode);
      alert(`${platform} account connected successfully with token: ${token}`);
    } catch (error) {
      alert('Error connecting account');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
        placeholder="Enter OAuth code"
      />
      <button onClick={handleConnect}>Connect {platform} Account</button>
    </div>
  );
};

export default ConnectAccount;
