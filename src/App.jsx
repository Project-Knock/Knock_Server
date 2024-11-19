import React,{useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Myroom from './pages/Myroom';
import Navigate from './components/Navigate';
import Login from './pages/Login'
import Signup from './pages/Signup';
import './style/App.css'
import { Link } from 'react-router-dom';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [id, setId] = useState('');
  const resetState = () => {
    console.log("reset!");
    // 로그인하지 않은 상태로 처리
    setId(null);
    setUser(null);
  }
  useEffect(() => {
    // 세션 상태 확인 API 호출
    console.log("change isloggedin");
    fetch('/is_logged_in')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Not logged in');
        }
      })
      .then(data => {
        if (data.logged_in) {
          setIsLoggedIn(true);
          setUser(data.user);  // 세션에서 사용자 정보 가져오기
          setId(data.id)
        }
      })
      .catch(error => {
        setIsLoggedIn(false);  // 로그인하지 않은 상태로 처리
        setId(null);
        setUser(null);
      });
    
  }, []);
  return (
    <BrowserRouter>
        <Navigate />
        <div className="App">
          <Routes>
            <Route path='/myroom' element={<Myroom isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}></Route>
            <Route path='/user' element={<Link to='/user/login'>login</Link>}></Route>
            <Route path='/user/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} setId={setId}/>}></Route>
            <Route path='/user/signup' element={<Signup />}></Route>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
