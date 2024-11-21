import React, {useState, useEffect} from 'react';
import '../style/components/Camera.css'
const Camera = (loggedIn) =>{
    const [url,setUrl] = useState(null);
    const loadCamUrl = () =>{
        fetch('/myroom/info/cam')
          .then((res) => res.json())
          .then((data) => {
            if(data.url===null){
              console.log(data);
            }else{
              setUrl(data.url)
            }
          }
        );
      }
      useEffect(() => { // loggedIn이 바뀔 때 마다 정보 불러오기
        if(loggedIn) loadCamUrl(); // 현제 세션이 서버에 있을 때 데이터 불러오기
      },[loggedIn]);
    return(
        <article className='camera-display'>
            <img src={url}/>
        </article>
    )
}

export default Camera