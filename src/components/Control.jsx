import React, { Children, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../style/components/Control.css';
import Window from '../assets/image/Window.svg';
import Aircon from '../assets/image/Air conditioner.svg';
import Door from '../assets/image/Door.svg';
const ControlBtn = ({path, src}) =>{
    const location = useLocation();
    return(
        <>{location.pathname.split('/')[1]===path.split('/')[1]?
            (<Link to={path} className='control-item' id='select'><li><img src={src}></img></li></Link>)
            :(<Link to={path} className='control-item'><li><img src={src}></img></li></Link>)}
        </>
    )
}
const Control = () =>{
    return(
        <nav className='control'>
            <ul className='control-items'>
                <ControlBtn path='/myroom/window' src={Window} />
                <ControlBtn path='/myroom/aircon/' src={Aircon} />
                <ControlBtn path='/myroom/door' src={Door} />
            </ul>
        </nav>
    )
}

export default Control;