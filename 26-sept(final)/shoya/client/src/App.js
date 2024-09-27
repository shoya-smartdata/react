import './App.css';
import { useState, useEffect } from 'react';
import AddUserForm from './components/Adduser/AddUserForm';
import Usertable from './components/Table/Usertable';
import Deleteuser from './components/Delete/Deleteuser';
import Updateuser from './components/Update/Updateuser';
import axios from 'axios';

import 'react-responsive-pagination/themes/classic.css';
import ResponsivePagination from 'react-responsive-pagination';
import Footer from './components/Footer/Footer';
import toast from 'react-hot-toast';
import LoginForm from './components/Login/LoginForm';


function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenDelete, setModalOpenDelete] = useState(false);
  const [isModalOpenUpdate, setModalOpenUpdate] = useState(false);
  const [data, setData] = useState([]); 
  const [userToDelete, setUserToDelete] = useState(null); 
  const [userToUpdate, setUserToUpdate] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(5); 
  const [currentPage, setCurrentPage] = useState(1);

  const [isAuthenticate, setIsAuthenticate] = useState(false)
  useEffect(() => {
    if (isAuthenticate) {
      handleGetData(); 
    }
  }, [isAuthenticate]);


  const handleGetData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users");
      setData(response.data);
     
    } catch (error) {
      toast.error("Error fetching user data");
    }
  };

  const handleAddUserClick = () => {
    setModalOpen(true);
  };

  const handleDeleteUserClick = (user) => {
    setUserToDelete(user);
    setModalOpenDelete(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalOpenDelete(false);
    setModalOpenUpdate(false);
    setUserToDelete(null); 
    setUserToUpdate(null);
  };

  const handleClear = () => {
    setSearchTerm('');
    handleGetData();
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const url = `http://localhost:4000/api/users?searchTerm=${searchTerm}`;
        const response = await axios.get(url);
       
        setData(response.data);
        toast.success("data fatched successfully !")
      } catch (error) {
        toast.error("Error fetching search results");
      }
    } else {
      handleGetData(); 
    }
  };


  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(data.length / itemsPerPage);

   const isLogin = (val)=>{
   setIsAuthenticate(val)
   }


   const handleLogou = ()=>{
    setIsAuthenticate(false)
    setData([])
   }
  return (
    <>
{!isAuthenticate ? <   LoginForm  isLogin={isLogin}/>:  <div>
        <header className="custom-nav">
      <nav className="navbar navbar-expand-lg px-4">
        <a className="navbar-brand nav-a" href="#">MyApp</a>
        <button className="nav-link a-custom btn mx-5" onClick={handleAddUserClick}>Add User</button>
        <div className="collapse navbar-collapse justify-content-between mx-5" id="navbarNav">
          <div className="ms-auto d-flex">
            <input
              type='text'
              className='form-control w-50 me-2' 
              placeholder='search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
            />
            <button className='btn btn-primary ' onClick={handleSearch}>Search</button>
            <button className='btn btn-danger mx-2' onClick={handleClear}>Clear</button>
            <button className='btn btn-danger' onClick={handleLogou}>Logout</button>
          </div>
        </div>
      </nav>
    </header>

    <section>
      <Usertable 
        data={paginatedData} 
        deleteBtm={handleDeleteUserClick} 
        setUserToUpdate={setUserToUpdate}
        setIsModalOpenUpdate={setModalOpenUpdate}
        
      />

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal} aria-label="Close modal">✖</button>
            <AddUserForm onClose={closeModal} refreshData={handleGetData} />
          </div>
        </div>
      )}

      {isModalOpenDelete && userToDelete && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✖</button>
            <Deleteuser 
              user={userToDelete} 
              closeModal={closeModal} 
              fetchAlluser={handleGetData}
            />
          </div>
        </div>
      )}

      {isModalOpenUpdate && userToUpdate && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✖</button>
            <Updateuser 
              dableValues={userToUpdate} 
              closeModal={closeModal} 
              refreshData={handleGetData} 
            />
          </div>
        </div>
      )}
    </section>

    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />

  

    <Footer></Footer>
      </div>
     }
  
    </>
    
  );
}

export default App;
