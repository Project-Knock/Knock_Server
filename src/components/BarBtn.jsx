import React from 'react';
import { Link } from "react-router-dom";
const BarBtn = ({path, src}) =>( <Link to={path} className='item'><li><img src={src}></img></li></Link> )
export default BarBtn;