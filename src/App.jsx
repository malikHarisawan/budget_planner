import * as React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import { useEffect } from 'react';

export default function App() {
 
  useEffect(()=>{
    fetch("http://localhost:3000/admin/me",{
      headers:{
        method: 'GET',
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    }).then(res => res.json()).then(data => console.log("Username:" ,data))

  },[])
  return (

  

    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/home" element={<Home/>}/>

        <Route path="/signup" element={<SignUp/>}/>

      </Routes>
    </Router>
    </>
  );
}