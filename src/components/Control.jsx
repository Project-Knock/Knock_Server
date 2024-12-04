import React, { Children, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../style/components/Control.css';
import Window from '../assets/image/Window.svg';
import Aircon from '../assets/image/Air conditioner.svg';
import Door from '../assets/image/Door.svg';
import BarBtn from './BarBtn';
const Control = ({loggedIn}) =>{
    return(
        <nav className='control'>
            <ul className='items'>
                {loggedIn?(
                    <>
                        <BarBtn path='/myroom/window' src={Window} />
                        <BarBtn path='/myroom/aircon/' src={Aircon} />
                        <BarBtn path='/myroom/door' src={Door} />
                    </>
                ):(
                    <>
                        <BarBtn path='/user/login' src={Window} />
                        <BarBtn path='/user/login' src={Aircon} />
                        <BarBtn path='/user/login' src={Door} />
                    </>
                )}
                
            </ul>
        </nav>
    )
}

export default Control;