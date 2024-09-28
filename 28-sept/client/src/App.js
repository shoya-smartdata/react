// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserForm from './components/UserForm';
import Getdata from './components/Getdata';

import Login from './components/Login'; 
import NotFound from './components/NotFound';
import UpdateUser from './components/Update.user';

function App() {
  return (
    <>
      <Router>
      
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/adduser" element={<UserForm />} />
          <Route path="/getdata" element={<Getdata />} />
          <Route path="/updateuser" element={<UpdateUser />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
