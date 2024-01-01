import * as React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';

export default function App() {
 

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