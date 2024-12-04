import React, {useState, useEffect} from 'react';
import '../style/components/ControlCard.css';
const RequestLi = ({time}) => {
  return(
    <li>
      <p>{time}</p>
      <button>수락</button>
    </li>
  )
}
const Camera = (loggedIn) =>{
    const [url,setUrl] = useState(null);
    const [req,setReq] = useState([
      {}
    ]);
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
      <>
        <article className='control-display'>
          <p className='control-title'>문 밖</p>
          <img className='control-content' src={url}/>
        </article>
        <article className='etc-display'>
          <p className='control-title'>요청 내역</p>
          <div className='control-content'>
            <ul>
              {req.map((data)=>{
                return <RequestLi {...data}/>
              })}
            </ul>
          </div>
        </article>
      </>
    )
}
export default Camera