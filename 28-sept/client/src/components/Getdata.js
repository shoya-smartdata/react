import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./Getdata.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 
import Navbar from "./Navbar";
import ReactPaginate from "react-paginate";
import Footer from "./Footer";

function Getdata() {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(5); 
  const navigate = useNavigate(); 

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/home");
      setTable(response.data.users);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    navigate("/UpdateUser", { state: { user } });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Pagination logic
  const pageCount = Math.ceil(table.length / usersPerPage);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Get current users
  const offset = currentPage * usersPerPage;
  const currentUsers = table.slice(offset, offset + usersPerPage);

  return (
    <>
      <Navbar />
      <div className="mt-5 container">
        <h2 className="text-center mb-4">User Data</h2>
        <Table striped bordered hover className="shadow rounded">
          <thead className="bg-primary text-white">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item)} 
                  >
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger mx-2">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
      <Footer/>
    </>
  );
}

export default Getdata;
