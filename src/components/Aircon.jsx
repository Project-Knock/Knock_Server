import React, {useState, useEffect} from 'react';
import '../style/components/ControlCard.css';
import '../style/components/Aircon.css';
const Aircon = () =>{
    return (
        <article className='control-display'>
          <p className='control-title'>에어컨 조절</p>
          <div className='control-content aircon-content'>
            <button onClick={()=>{fetch('/myroom/aircon/power')}} className='power'></button>
            <div className='updown'>
              <button onClick={()=>{fetch('/myroom/aircon/up')}} className='up'>up</button>
              <button onClick={()=>{fetch('/myroom/aircon/down')}} className='down'>down</button>
            </div>
          </div>
        </article>
    )
}
export default Aircon;