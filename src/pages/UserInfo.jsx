import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../style/pages/UserInfo.css';
const UserInfo = () => {
    const [loggedIn,setLoggedIn] = useState(true);
    useEffect(()=>{ // 현제 서버에 세션이 남아있는지 확인
        fetch('/is_logged_in').then((res)=>res.json()).then((data)=>{setLoggedIn(data.logged_in)})
    })
    return(
        <div className='user-info'>
            <article className='userinfo-display'>
            {loggedIn?(
                <>
                    <button onClick={()=>{
                        fetch('/logout')
                    }}>logout</button>
                </>
            ):(
                <>
                    <p className='title'>로그인 후 이용해주세요</p>
                    <div className='content'>
                    <Link to='/user/login'>login</Link>
                    </div>
                </>
            )}
            </article>
        </div>
    )
}

export default UserInfo;