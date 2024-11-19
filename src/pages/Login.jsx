import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/Login.css';
const Login = ({setIsLoggedIn,setUser,setId}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    // 로그인 처리 로직을 구현합니다.
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    
    const response = await fetch(
      "/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    const result = await response.json();

    if (result.status === 201) {
      setLoginCheck(false);
      setUser(username);
      setId(result.message);
      setIsLoggedIn(true);
      // Store token in local storage
      console.log(result);
      navigate("/"); // 로그인 성공시 홈으로 이동합니다.
    } else {
      setLoginCheck(true);
    }
  };
  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <p className="title">로그인</p>
        <div className="id">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="passwd">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
         {loginCheck && (
        <label  style={{color: "red"}} className="alter">이메일 혹은 비밀번호가 틀렸습니다.</label>
        )}
        <button onClick={handleLogin} className="loginbt">로그인</button>

        <p className="signup-link">
          아직 회원이 아니신가요? <Link to="/user/signup">회원가입</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;