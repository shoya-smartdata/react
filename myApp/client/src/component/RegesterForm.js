import React, { useState } from 'react';
import styles from './regester.module.css';
import axios from 'axios';


function RegesterForm() {
  const [value1, setValue1] = useState(''); 
  const [value2, setValue2] = useState(''); 
  const [value3, setValue3] = useState(''); 
  const [value4, setValue4] = useState(''); 
  const [value5, setValue5] = useState(''); 

  const handleSubmi = async (event) => {
    event.preventDefault(); 

    const data = {
      id: value1,
      name: value2, 
      email: value3, 
      phone: value4,
      address: value5
    };
    console.log(data);
    

    try {
      const response = await axios.post('http://localhost:4000/addData', data);
      console.log('Data added successfully:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <section className='d-flex flex-column justify-content-center h-100'> 
        <h3 className={`${styles.formstyle}  `}>Fill up to register!</h3>
        <div className=' container d-flex justify-content-center  '>
        <form className={`${styles.formstyle}  shadow w-50 rounded bg-light`} onSubmit={handleSubmi}>
          <label>Id</label>
          <input 
            type='text' 
            placeholder='enter valid id' 
            value={value1} 
            onChange={(e) => setValue1(e.target.value)} 
             className='rounded shadow'

          /> 
          <br/>
          <label>Name</label>
          <input 
            type='text' 
            placeholder='enter name' 
            value={value2} 
            onChange={(e) => setValue2(e.target.value)} 
            className='rounded shadow'
          /><br/>
          <label>Email</label>
          <input 
            type='text' 
            placeholder='enter email' 
            value={value3} 
            onChange={(e) => setValue3(e.target.value)} 
             className='rounded shadow'
          /><br/>

          {/* extra  */}

          <label>Phone</label>
          <input 
            type='text' 
            placeholder='enter phone no' 
            value={value4} 
            onChange={(e) => setValue4(e.target.value)} 
             className='rounded shadow'
          /><br/>
            <label>Address</label>
          <input 
            type='text' 
            placeholder='enter address' 
            value={value5} 
            onChange={(e) => setValue5(e.target.value)} 
             className='rounded shadow'
          /><br/>
          <button className='btn bg-primary text-light m-1 ' type='submit'>Submit!</button>
        </form>

        </div>
        
      </section>
    </>
  );
}

export default RegesterForm;
