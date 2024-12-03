import React, { Children, useEffect } from 'react';
import { Link } from "react-router-dom";
import BarBtn from './BarBtn';
import Bed from '../assets/image/Bed.svg';
import User from '../assets/image/User.svg';
import '../style/components/Navigate.css';
const Navigater = () =>{
    return(
        <header className='navigate'>
            <ul className='items'>
                <BarBtn path='/myroom' src={Bed} />
                <BarBtn path='/user' src={User} />
            </ul>
        </header>
    )
}

export default Navigater;