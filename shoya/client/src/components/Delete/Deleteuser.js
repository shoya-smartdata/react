// src/FormComponent.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './deleteUSer.module.css'

const Deleteuser = () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('ID:', id);
        console.log('Email:', email);
    };

    return (
        <div className={styles.formcontainer}>
            <h2 className={styles.formtitle}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="idInput" className="form-label">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="idInput"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Enter your ID"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
};

export default Deleteuser;
