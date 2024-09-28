
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateUser = ({ userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
 
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/update/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const { name, email, phone } = response.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4001/api/update/${userId}`, {
        name,
        email,
        phone,
        password,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      if (response.status === 200) {
        console.log(response.data);
        alert('User updated successfully!');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user: ' + (error.response?.data?.message || error.message));
    }
  };
  
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="border rounded p-3 shadow-sm" style={{ width: '300px', height: 'auto' }}>
        <h2 className="mb-4 text-center" style={{ fontSize: '1.5rem' }}>Update User</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control form-control-sm"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control form-control-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="text"
              id="phone"
              className="form-control form-control-sm"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">New Password (optional)</label>
            <input
              type="password"
              id="password"
              className="form-control form-control-sm"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm w-100">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
