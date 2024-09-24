import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import styles from "./UserData.module.css";

function UsersData(props) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(props.data.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const displayedItems = props.data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDelete = (props)=>{
      props.clicked(()=>handleDelete())
  }


  return (
    <>
      <section className="container mt-4">
        <table
          className={`table table-striped table-bordered shadow ${styles.table}`}
        >
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col" style={{ width: "50px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <th scope="row">{currentPage * itemsPerPage + index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td className="d-flex ">
                  <button
                    className={`${styles.deleteButton} btn btn-primary btn-sm mx-2`}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={`${styles.deleteButton} btn btn-danger btn-sm`}
                    title="Delete"
                    onClick={handleDelete}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={`pagination justify-content-center ${styles.pagination}`}
          activeClassName={styles.active}
          previousClassName={`page-item ${styles.previous}`}
          nextClassName={`page-item ${styles.next}`}
          disabledClassName={`page-item disabled ${styles.disabled}`}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
        />
      </section>
    </>
  );
}

export default UsersData;
