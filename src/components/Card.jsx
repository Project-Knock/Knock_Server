import React,{useState, useEffect} from 'react';
import '../style/components/Card.css';
const Card = (loggedIn) => {
  const [info, setInfo] = useState({"temperature":"loading...","humidity":"loading...","detectedAt":"loading..."});
  const [isLoad, setIsLoad] = useState(false);
  const loadRoomData = () =>{
    fetch('/myroom/info/tehu')
      .then((res) => res.json())
      .then((data) => {
        if(data.temperature===null||data.humidity===null){
          console.log(data);
        }else{
          setInfo({"temperature":data.temperature,"humidity":data.humidity,"detectedAt":data.detectedAt})
          setIsLoad(true);
        }
      }
    );
  }
  useEffect(() => { // loggedIn이 바뀔 때 마다 정보 불러오기
    if(loggedIn.loggedIn) setTimeout(loadRoomData,500); // 현제 세션이 서버에 있을 때 데이터 불러오기
  },[loggedIn.loggedIn]);
  return(
    <>
      <article className='infomation-display'>
              {(loggedIn.loggedIn)?
                (
                  <>
                  {isLoad?
                    (
                      <>
                        <p className='temp' onClick={()=>{
                          fetch('/myroom/info/tehu')
                          .then((res) => res.json())
                          .then((data) => {
                            setInfo({"temperature":data.temperature,"humidity":data.humidity,"detectedAt":data.detectedAt})
                          }
                        );
                        }}>{info.temperature}℃</p>
                        <p className='humi'>현재 습도 {info.humidity}%</p>
                        <p className='timestemp'>{info.detectedAt}</p>
                      </>
                    ):(
                      <>
                        <h1 className='temp'>loading..</h1>
                      </>
                    )
                  } 
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