import React from 'react'
import styles from './update.module.css'
function Updateuser() {

const handleSubmit = ()=>{
    console.log("hehehe !");
    
}

  return (
   <>
   
   <div className={styles.formContainer}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
          
           
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
          
            
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
          
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
           
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
          
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Add User !
        </button>
      </form>
    </div>
   
   </>
  )
}

export default Updateuser