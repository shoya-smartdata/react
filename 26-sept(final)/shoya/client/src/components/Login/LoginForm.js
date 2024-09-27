import React, { useState } from 'react';
import styles from './LoginForm.module.css'

const LoginForm = ({isLogin}) => {

const [auth, setAuth] = useState(false)
  const handleOnsubmit = ()=>{
  const val=true;
    isLogin(val);
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow" style={{ width: '25rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <form  >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" onClick={handleOnsubmit} className={` btn btn-primary w-100 ${styles.hoveranimation}`}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
