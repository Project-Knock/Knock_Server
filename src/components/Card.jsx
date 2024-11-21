import React,{useState, useEffect} from 'react';
import '../style/components/Card.css';
const Card = () => {

  const [info, setInfo] = useState({"temperature":"loading...","humidity":"loading...","detectedAt":"loading..."});
  const [loggedIn,setLoggedIn] = useState(true);
  const loadRoomData = () =>{
    fetch('/myroom/info/tehu')
      .then((res) => res.json())
      .then((data) => {
        if(data.temperature===null||data.humidity===null){
          console.log(data);
        }else{
          setInfo({"temperature":data.temperature,"humidity":data.humidity,"detectedAt":data.detectedAt})
        }
      }
    );
  }
  useEffect(()=>{ // 현제 서버에 세션이 남아있는지 확인
    fetch('/is_logged_in').then((res)=>res.json()).then((data)=>{setLoggedIn(data.logged_in)})
  })
  useEffect(() => { // loggedIn이 바뀔 때 마다 정보 불러오기
    if(loggedIn) loadRoomData(); // 현제 세션이 서버에 있을 때 데이터 불러오기
  },[loggedIn]);
  return(
    <>
      <article className='infomation-display'>
              {loggedIn?
                (
                  <>
                    <p className='temp' onClick={()=>{
                      fetch('/myroom/info/tehu')
                      .then((res) => res.json())
                      .then((data) => {
                        if(data.temperature===null||data.humidity===null){
                          
                        }else{
                          setInfo({"temperature":data.temperature,"humidity":data.humidity,"detectedAt":data.detectedAt})
                        }
                      }
                    );
                    }}>{info.temperature}℃</p>
                    <p className='humi'>현재 습도 {info.humidity}%</p>
                    <p className='timestemp'>{info.detectedAt}</p>
                  </>
                ):(
                  <h1 className='temp'>please login</h1>
                )
              }
      </article>
    </>
  )
}

export default Card;