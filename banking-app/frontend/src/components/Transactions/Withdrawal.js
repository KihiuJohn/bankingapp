// src/components/Transactions/Withdrawal.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

const Withdrawal = () => {
  const { token, user } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transactions/withdrawal`,
        { amount: parseFloat(amount), transactionPin: pin },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (user.userType === 'member') {
        setMessage('Withdrawal request submitted for approval');
      } else {
        setMessage('Withdrawal successful!');
      }
      
      setAmount('');
      setPin('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Withdrawal failed');
    }
  };

  return (
    <div className="withdrawal-form">
      <h2>Request Withdrawal</h2>
      {message && <div className="message">{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Transaction PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            maxLength="4"
          />
        </div>

        <button type="submit">Submit Withdrawal</button>
      </form>
    </div>
  );
};

export default Withdrawal;
