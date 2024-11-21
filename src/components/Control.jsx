import React, { Children, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../style/components/Control.css';
import Window from '../assets/image/Window.svg';
import Aircon from '../assets/image/Air conditioner.svg';
import Door from '../assets/image/Door.svg';
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
                <ControlBtn src={Window} />
                <ControlBtn src={Aircon} />
                <ControlBtn src={Door} />
            </ul>
        </header>
    )
}

export default Control;