import React, { useState } from 'react';
import styles from './Adduser.module.css'; 
import axio from 'axios'

function AddUserForm() {
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    phoneNo: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddUsers = async(e)=>{
    e.preventDefault();
const data ={
 
  name: userData.name,
  email: userData.email,
  phone: userData.phoneNo,
  address : userData.phoneNo
}

  try {
    const response = await axio.post('http://localhost:4000/api/adduser', data);
  console.log("user added successfully !", response.data.name);
  setUserData({
    
    name: '',
    email: '',
    phoneNo: '',
    address: '',
  });

  } catch (error) {
    console.log("error occured", error);
    
  }

  }

  return (
    <div className={styles.formContainer}>
      <h2>Add User</h2>
      <form onSubmit={handleAddUsers}>
       
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={userData.phoneNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;
