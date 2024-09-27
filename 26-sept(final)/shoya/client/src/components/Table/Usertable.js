import React from "react";
import styles from "./table.module.css";
import { MdDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

function Usertable({ data, deleteBtm, setUserToUpdate, setIsModalOpenUpdate }) {
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
          {data.length > 0 ? (
            data.map((item, index) => (
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
                    onClick={() => deleteBtm(item)}
                  >
                    <MdDeleteSweep />
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => {
                      setUserToUpdate(item);
                      setIsModalOpenUpdate(true);
                    }}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Toaster/>
    </div>
  );
}

export default Usertable;
