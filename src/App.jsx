import * as React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import { useEffect,useState } from 'react';

export default function App() {

  const [userEmail,setUserEmail] = useState(null);
 
  useEffect(()=>{
    fetch("http://localhost:3000/admin/me",{
      headers:{
        method: 'GET',
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    }).then(res => res.json()).then(data =>
      { if(data.username){
        setUserEmail(data.username)
      }
      })

  },[])
  
  if(userEmail){
    return <>
      <Home/>
    </>
   
  }
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