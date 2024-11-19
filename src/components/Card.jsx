import React,{useState, useEffect} from 'react';
import '../style/Card.css';
const Card = ({isLoggedIn,setIsLoggedIn}) => {
  const [info, setInfo] = useState({"temperature":0.0,"humidity":0.0});
  const loadRoomData = () =>{
    fetch('/myroom/info/tehu')
      .then((res) => res.json())
      .then((data) => {
        if(data.temperature===null||data.humidity===null){
          setIsLoggedIn(false);
        }else{
          setInfo({"temperature":data.temperature,"humidity":data.humidity})
          setIsLoggedIn(true);
        }
      }
    );
  }
  useEffect(() => {
    loadRoomData();
  }, []);
  return(
      <>
              <article className='infomation-display'>
                {isLoggedIn?
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
                          setIsLoggedIn(false);
                        }else{
                          setInfo({"temperature":data.temperature,"humidity":data.humidity})
                          setIsLoggedIn(true);
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