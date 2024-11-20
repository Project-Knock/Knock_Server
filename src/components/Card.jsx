import React,{useState, useEffect} from 'react';
import '../style/Card.css';
const Card = () => {

  const [info, setInfo] = useState({"temperature":0.0,"humidity":0.0});
  const [loggedIn,setLoggedIn] = useState(false);
  const loadRoomData = () =>{
    console.log("hello");
    fetch('/myroom/info/tehu')
      .then((res) => res.json())
      .then((data) => {
        if(data.temperature===null||data.humidity===null){
          console.log(data);
        }else{
          setInfo({"temperature":data.temperature,"humidity":data.humidity})
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
                    <h1 className='temp'>{info.temperature} C</h1>
                    <h1 className='humi'>{info.humidity} %</h1>
                    <p className='timestemp'>마지막 확인 시간 : <br/>{null}분</p>
                    <button className='reload-button' onClick={()=>{
                      fetch('/myroom/info/tehu')
                      .then((res) => res.json())
                      .then((data) => {
                        if(data.temperature===null||data.humidity===null){
                          
                        }else{
                          setInfo({"temperature":data.temperature,"humidity":data.humidity})
                         
                        }
                      }
                    );
                    }}>새로고침</button>
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