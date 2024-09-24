import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import styles from './Delete.model.css'
function Deleteuser() {

let [id, setId] = useState('');
let [email, setEmail] = useState('');


const handlesubmit = async() =>{
    const  data = { 
   id: id,
   email: email
     }
  try {
    const response = await axios.delete('http://localhost:4000/api/delete', {data}, )
    console.log("response : ", response.data);
    toast.success("user deleted successfully !")
    
  } catch (error) {
    toast.error("error occured : ", error);
    
  }

}



// function handlesubmit(){
//     console.log(id, email);
//     handleDeleteapi();
    
// }

  return (
    <>
 <div className="d-flex justify-content-center align-items-center  model-overlay custom-delete">
            <form onSubmit={handlesubmit} className="bg-light p-3 rounded border shadow" style={{ width: '300px' }}>
                <h4 className="text-center mb-3">Delete Account</h4>
                
                <div className="mb-3">
                    <label className="form-label">ID</label>
                    <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        placeholder="ID" 
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control form-control-sm" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
    <div className='container d-flex '>

    <button type="submit" className="btn mx-1 btn-danger btn-sm w-100">Delete!</button>
                <button type="submit" className="btn btn-success btn-sm w-100">cancel!</button>
    </div>
            </form>
        </div>


    
    </>
  )
}

export default Deleteuser