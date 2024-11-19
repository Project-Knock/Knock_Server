import React from 'react';
import Card from '../components/Card';
import Control from '../components/Control';
import '../style/Myroom.css'
const Myroom = ({isLoggedIn,setIsLoggedIn}) =>{
    return(
        <div className='main'>
            <Card isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Control />
        </div>
    )
}
export default Myroom;