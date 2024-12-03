import React,{useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import RoomInfo from './pages/RoomInfo';
import Navigater from './components/Navigater';
import Login from './pages/Login'
import Signup from './pages/Signup';
import UserInfo from './pages/UserInfo';
import './style/App.css';
function App() {
  
  return (
    <BrowserRouter>
        <Navigater />
        <div className="App">
          <Routes>
            <Route path='*' element={<Navigate to='myroom'/>}></Route>
            <Route path='/myroom/*' element={<RoomInfo />}></Route>
            <Route path='/user' element={<UserInfo />}></Route>
            <Route path='/user/login' element={<Login />}></Route>
            <Route path='/user/signup' element={<Signup />}></Route>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
