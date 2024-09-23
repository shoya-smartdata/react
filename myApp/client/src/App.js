
import { useState } from 'react';
import './App.css';
import RegesterForm from './component/RegesterForm';
import UsersData from './component/UsersData';
import axios from 'axios';
import { FaEdit, FaSearch  } from "react-icons/fa";


import Footer from './component/Footer';
import WelcomePage from './component/WelcomePage';
import UpdateValues from './component/updateValues'; 



function App() {

  let [showForm , setshowForm] = useState(false);
  let [showTable, setShowTable] = useState(false)
  let [welcome, setWelcome] = useState(true);
  let [updateUser, setUpdateUser] = useState(false);

 
 function handleReg(){
  setshowForm(true)
  setShowTable(false)
  setWelcome(false)
  setUpdateUser(false)
  }

let  [data, setData] = useState([])



const handleGetdata = async (event) => {
   

    try {
      const response = await axios.get('http://localhost:4000/getdata');
      console.log('Data added successfully:', response.data);
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setShowTable(true)
    setshowForm(false)
    setUpdateUser(false)
}


//filter api 

const [searchTerm, setSearchTerm] = useState("");
const handleSearch = async () => {
  
  if (searchTerm) {
    try {
      const url = `http://localhost:4000/api/users?searchTerm=${searchTerm}`;
      console.log("Fetching from:", url);
      const response = await axios.get(url);
      console.log("Search response:", response.data);
       console.log(response.data);
       
     

      
      if(response.data.length === 0){
      response.data = [
        {
          id : "",
name: "User not found !",
email: "----"

        }
      ]
      setData(response.data)
      console.log(response.data);
      
       
      }else{
        setData(response.data);
     

      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  } else {
    handleGetdata();
 
  }
};

function handleCleardata(){
  handleGetdata()
}


function handleUpdate(){
 
   

  setWelcome(false)
  setUpdateUser(true)
  setShowTable(false)
  setshowForm(false)
}



  return (
<>
<header>
  <nav>
    <span>MyApp</span>
    <ul className='custom-class'>
      <li>
        <button onClick={handleGetdata}>Get Users</button>
      </li>
      <li>
        <button onClick={handleReg}>Register</button>
      </li>
      
    </ul>
    <ul className='custom-class'>
    <li>
        <input
          type='text'
          placeholder='Search here'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
        <button className='bg-success my-0 p-1 rounded mx-1' onClick={handleCleardata}>Clear</button>
        <button className='btn bg-danger' onClick={handleUpdate}>
          <FaEdit />
        </button>
      </li>
    </ul>
  </nav>
</header>


<section className='mono-body'>
{showForm && <RegesterForm/>}


{showTable && <UsersData data ={data}/>}

{ welcome && <WelcomePage />}

{updateUser && <UpdateValues/>} 
</section>



 <Footer></Footer>

</>
  );
}

export default App;
