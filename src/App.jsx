import React,{useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomInfo from './pages/RoomInfo';
import Navigate from './components/Navigate';
import Login from './pages/Login'
import Signup from './pages/Signup';
import UserInfo from './pages/UserInfo';
import './style/App.css'
function App() {
  return (
    <BrowserRouter>
        <Navigate />
        <div className="App">
          <Routes>
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
