
import React, { useEffect, useState } from "react";
import styles from "./table.module.css";
import axios from "axios";
import Deleteuser from '../Delete/Deleteuser';
import { MdDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Updateuser from "../Update/Updateuser";

function Usertable({data}) {
  const [tableData, setTableData] = useState([]);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null); 

  const handleTableData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/getuser");
      setTableData(response.data.result);
    } catch (error) {
      console.error("Error fetching data");
    }
  };

  useEffect(() => {
    handleTableData();
  }, []);

  const handleDeleteButtonClick = (user) => {
    setUserToDelete(user);
    setIsModalOpenDelete(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpenDelete(false);
    setUserToDelete(null);
  };

  const handleDeleteSuccess = (deletedId) => {
    setTableData((prevData) => prevData.filter(item => item.id !== deletedId));
    closeDeleteModal();
  };

  const handleAddUserClick = (user) => {
    setUserToUpdate(user);
    setIsModalOpenAdd(true);
  };

  const closeAddUserModal = () => {
    setIsModalOpenAdd(false);
    setUserToUpdate(null); 
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.customTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleDeleteButtonClick(item)}
                >
                  <MdDeleteSweep />
                </button>
                
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => handleAddUserClick(item)} 
                >
                  <FaRegEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpenDelete && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeDeleteModal}>✖</button>
            {userToDelete && (
              <Deleteuser
                user={userToDelete}
                deleteSuccess={handleDeleteSuccess}
                closeModal={closeDeleteModal}
              />
            )}
          </div>
        </div>
      )}

      {isModalOpenAdd && userToUpdate && (
        <div className="modal-overlay" onClick={closeAddUserModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeAddUserModal}>✖</button>
            <Updateuser dableValues={userToUpdate} closeModal={closeAddUserModal} refreshData={handleTableData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Usertable;