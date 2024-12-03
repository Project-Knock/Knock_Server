import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Card from '../components/Card';
import Control from '../components/Control';
import Camera from '../components/Camera';
import Aircon from '../components/Aircon';
import '../style/pages/RoomInfo.css'
const RoomInfo = () =>{
    const [loggedIn,setLoggedIn] = useState(true);
    useEffect(()=>{ // 현제 서버에 세션이 남아있는지 확인
        fetch('/is_logged_in').then((res)=>res.json()).then((data)=>{setLoggedIn(data.logged_in)})
    })
    return(
        <div className='room-info'>
            <Card loggedIn={loggedIn}/>
            <div className='tmp'></div>
            <Control />
                <Routes>
                    <Route path='/door' element={<Camera loggedIn={loggedIn}/>}></Route>
                    <Route path='/aircon' element={<Aircon />}></Route>
                </Routes>
        </div>
    )
}
export default RoomInfo;