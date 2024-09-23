
import { useState } from 'react';
import './App.css';
import RegesterForm from './component /RegesterForm';
import UsersData from './component /UsersData';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import Footer from './component /Footer';
import WelcomePage from './component /WelcomePage';

function App() {

  let [showForm , setshowForm] = useState(false);
  let [showTable, setShowTable] = useState(false)
  let [welcome, setWelcome] = useState(true)
 
 function handleReg(){
  setshowForm(true)
  setShowTable(false)
  setWelcome(false)
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



  return (
<>
<header>
  <span>MyApp</span>
  <nav>
    <li>
      <button onClick={handleReg}>REGESTER !</button>
    </li>
    <li>
    <button onClick={handleGetdata} >GET DATA</button>
    </li>

    <li>
      <input type='text' placeholder='search here'
      
      value={searchTerm} 
      onChange={(e)=>setSearchTerm(e.target.value)}
      /> <button onClick={handleSearch}><FaSearch /></button> 
      <button onClick={handleCleardata}>CLEAR</button>
    </li>
  </nav>
</header>




<section>
{showForm && <RegesterForm/>}


{showTable && <UsersData data ={data}/>}

{ welcome && <WelcomePage />}

</section>

 <Footer></Footer>
</>
  );
}

export default App;
