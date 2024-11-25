import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Control from '../components/Control';
import Camera from '../components/Camera';
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
            <Camera loggedIn={loggedIn}/>
        </div>
    )
}
export default RoomInfo;