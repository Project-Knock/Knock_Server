import React, { Children, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../style/components/Navigate.css';
import Bed from '../assets/image/Bed.svg';
import Home from '../assets/image/Home.svg';
import User from '../assets/image/User.svg';
const NavigateBtn = ({path,src}) =>{
    const location = useLocation();
    return(
        <>{location.pathname.split('/')[1]===path.split('/')[1]?
            (<Link to={path} className='navigate-item' id='select'><li><img src={src}></img></li></Link>)
            :(<Link to={path} className='navigate-item'><li><img src={src}></img></li></Link>)}
        </>
    )
}
const Navigate = () =>{
    return(
        <header className='navigate'>
            <ul className='navigate-items'>
                <NavigateBtn path='/' src={Home} />
                <NavigateBtn path='/myroom' src={Bed} />
                <NavigateBtn path='/user' src={User} />
            </ul>
        </header>
    )
}

export default Navigate;