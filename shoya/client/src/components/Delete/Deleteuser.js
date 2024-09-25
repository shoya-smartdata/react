// src/Deleteuser.js

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Delete/deleteUSer.module.css';
import axios from 'axios';

const Deleteuser = ({ user, deleteSuccess, closeModal }) => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = {
            id: user.id,
            email: email
        }

        try {
            const response = await axios.delete('http://localhost:4000/api/deleteuser', { data });
            console.log("Response:", response.data);
            deleteSuccess(user.id);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (!user) return null;

    return (
        <div className={styles.formcontainer}>
            <h2 className={styles.formtitle}>Delete User</h2>
            <form onSubmit={handleSubmit}>
                <p>Are you sure you want to delete {user.name}?</p>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        value={email}
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-danger w-100">Delete</button>
                <button type="button" className="btn btn-secondary w-100 mt-2" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default Deleteuser;
