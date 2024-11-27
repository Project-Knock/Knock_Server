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
    useEffect(()=>{
      if(loggedIn) setTimeout(loadCamUrl,1000);
    },[loggedIn])
    return(
        <article className='camera-display'>
          <p className='cam-title'>Camera</p>
          <img className='camera' src={url}/>
        </article>
    )
}

export default Camera