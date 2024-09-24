import './App.css';
import { useState } from 'react';
import AddUserForm from './components/Adduser/AddUserForm';
import Usertable from './components/Table/Usertable';
import Deleteuser from './components/Delete/Deleteuser';
import Updateuser from './components/Update/Updateuser';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenDelete, setModalOpenDelete] = useState(false);
  const [isModalOpenUpdate, setModalOpenUpdate] = useState(false);
  

// function for add user from box open as model 

  const handleAddUserClick = () => {
    setModalOpen(true);
  };

// secnd for delete box 

const handleDeleteUserClick = ()=>{
  setModalOpen(false)
  setModalOpenDelete(true);
  setModalOpenUpdate(false)
}

// 3 for open update box. . . 
 const handleUpdateModle = ()=>{
  setModalOpenUpdate(true)
  setModalOpen(false)
  setModalOpenDelete(false);
 }

  const closeModal = () => {
    setModalOpen(false);
    setModalOpenDelete(false);
    setModalOpenUpdate(false)
   
  };

  return (
    <>
      <header className="custom-nav">
        <nav className="navbar navbar-expand-lg px-4">
          <a className="navbar-brand nav-a" href="#">MyApp</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between mx-5" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link a-custom" href="#">Get User</a>
              </li>
              <li className="nav-item">
                <button className="nav-link a-custom btn" onClick={handleAddUserClick}>
                  Add User
                </button>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 d-flex align-items-center">
              <input
                className="form-control mr-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success mx-1" type="submit">Search</button>
              <button className="btn btn-warning mx-2" type="button">Clear</button>
              <button className="btn btn-info mx-2" type="button"
              
              onClick={handleUpdateModle}
              >Edit</button>
              <button className="btn btn-danger" type="button"
              onClick={handleDeleteUserClick}
              >Delete</button>
            </form>
          </div>
        </nav>
      </header>

      <section>
        <Usertable />
        {isModalOpen && (
  <div className="modal-overlay" onClick={closeModal} aria-hidden={!isModalOpen}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={closeModal} aria-label="Close modal">✖</button>
      <AddUserForm />
    </div>
  </div>
)}
          {isModalOpenDelete && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>✖</button>
              <Deleteuser />
            </div>
          </div>
        )}
         {isModalOpenUpdate && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>✖</button>
              <Updateuser />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
