import React, {useState, useEffect} from 'react';
import '../style/components/ControlCard.css'
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
      if(loggedIn.loggedIn) setTimeout(loadCamUrl,1000);
    },[loggedIn.loggedIn])
    return(
        <article className='control-display'>
          <p className='control-title'>문 밖</p>
          <img className='control-content' src={url}/>
        </article>
    )
}
export default Camera