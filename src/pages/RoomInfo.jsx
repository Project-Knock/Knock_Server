import React from 'react';
import Card from '../components/Card';
import Control from '../components/Control';
import Camera from '../components/Camera';
import '../style/pages/RoomInfo.css'
const RoomInfo = () =>{
    return(
        <div className='room-info'>
            <Card />
            <div className='tmp'></div>
            <Control />
            <Camera />
        </div>
    )
}
export default RoomInfo;