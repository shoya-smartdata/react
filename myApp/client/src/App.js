import { useState } from "react";
import "./App.css";
import RegesterForm from "./component/RegesterForm";
import UsersData from "./component/UsersData";
import axios from "axios";
import { FaEdit, FaSearch } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Footer from "./component/Footer";
import UpdateValues from "./component/updateValues";
import Deleteuser from "./component/Deleteuser";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [getUser, setGetuser] = useState(false)

  const handleGetData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getdata");
      setData(response.data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const url = `http://localhost:4000/api/users?searchTerm=${searchTerm}`;
        const response = await axios.get(url);
        if (response.data.length) {
          setData(response.data);
        } else {
          setData([{ id: "", name: "User not found!", email: "----" }]);
          toast.error("User not found!");
        }
      } catch (error) {
        toast.error("Error fetching search results");
      }
    } else {
      handleGetData();
    }
  };
  
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const regesterUser = ()=>{
   setGetuser(true)
  }

  return (
    <>
      <Toaster />
      <header>
        <nav>
          <span>MyApp</span>
          <ul className="custom-class">
            <li>
              <button onClick={handleGetData}>Get Users</button>
            </li>
            <li>
              <button onClick={regesterUser}>Register</button>{" "}
              {/* Adjust if needed */}
            </li>
          </ul>
          <ul className="custom-class">
            <li>
              <input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>
                <FaSearch />
              </button>
              <button
                className="bg-success my-0 p-1 rounded mx-1"
                onClick={handleGetData}
              >
                Clear
              </button>
              <button
                className="bg-primary my-0 px-2 py-1 rounded mx-1"
                onClick={() => openUpdateModal(selectedUser)}
              >
                <FaEdit />
              </button>
              <button
                className="bg-danger my-0 px-2 py-1 rounded mx-1"
                onClick={() => openDeleteModal(selectedUser)}
              >
                <RiDeleteBin6Fill />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <section className="mono-body">
        <UsersData
          data={data}
          onEdit={openUpdateModal}
          onDelete={openDeleteModal}
        />

        {isUpdateModalOpen && <UpdateValues />}
        {isDeleteModalOpen && <Deleteuser />}
   {   getUser && <RegesterForm />}
      </section>

      <Footer />
    </>
  );
}

export default App;
