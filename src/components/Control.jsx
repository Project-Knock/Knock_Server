import React, { Children, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../style/components/Control.css';
import Bed from '../assets/image/Bed.svg';
import Home from '../assets/image/Home.svg';
import User from '../assets/image/User.svg';
const ControlBtn = ({src}) =>{
    return(
        <>
            <li><img src={src}></img></li>
        </>
    )
}
const Control = () =>{
    return(
        <header className='control'>
            <ul className='control-items'>
                <ControlBtn src={Home} />
                <ControlBtn src={Bed} />
                <ControlBtn src={User} />
            </ul>
        </header>
    )
}

export default Control;