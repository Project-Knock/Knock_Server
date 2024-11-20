import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../style/pages/UserInfo.css';
const UserInfo = () => {
    const [loggedIn,setLoggedIn] = useState(false);
    useEffect(()=>{ // 현제 서버에 세션이 남아있는지 확인
        fetch('/is_logged_in').then((res)=>res.json()).then((data)=>{setLoggedIn(data.logged_in)})
      })
    return(
        <div className='user-info'>
            {loggedIn?(
                <>
                
                </>
            ):(
                <>
            
                </>
            )}
        </div>
    )
}

export default UserInfo;