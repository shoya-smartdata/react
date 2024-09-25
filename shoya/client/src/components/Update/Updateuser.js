import React, { useState, useEffect } from 'react';
import styles from './update.module.css';
import axios from 'axios';

function Updateuser({ dableValues, closeModal, refreshData }) {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setFormValues(dableValues);
  }, [dableValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Values:", formValues);

    const { id, name, email, phone, address } = formValues; 



    

    try {
      await axios.patch(`http://localhost:4000/api/update-users`, {
      id,
      name,
      email,
      phone,
      address
    });
      refreshData(); 
      closeModal(); 
    } catch (error) {
      console.error("Error updating user:", error);
      
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name }
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
            value={formValues.email } 
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            type="text"
            id="phoneNo"
            name="phone"
            value={formValues.phone } 
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
            value={formValues.address} 
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Update User!
        </button>
      </form>
    </div>
  );
}

export default Updateuser;
