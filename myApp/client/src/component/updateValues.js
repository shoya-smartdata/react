
import React, { useState } from 'react';
import axios from 'axios';

function UpdateValues() {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      
      const data = { id, name, phone, email, address };
      console.log(data);
  
      try {
          const response = await axios.put(`http://localhost:4000/api/update/${id}`, data);
           console.log("data successfully changed", response);
           
        } catch (error) {
          console.error(error);
          
        }
      
    };
  return (
   <>
 <div className="container mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', margin: 'auto' }}>
        <h3 className="mb-4 text-center">User Information</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Id</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="id"
              placeholder="Enter required id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              className="form-control form-control-sm"
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
      </div>
    </div>

   </>
  )
}

export default UpdateValues;