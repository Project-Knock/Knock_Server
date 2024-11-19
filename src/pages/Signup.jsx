import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/Signup.css';
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupCheck, setSignupCheck]=useState(false);
  const [signError,setSignError]=useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    // 회원가입 처리 로직을 구현합니다.

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // Create payload
    const payload = {
      id: "12345",
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        "/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.status === 201) {
        // Redirect to login.html
        console.log("성공!");
        setSignupCheck(false);
        navigate("/login"); // 로그인 성공시 홈으로 이동합니다.
      } else if (data.status === 401||data.status===402) {
        // Handle error
        setSignError(data.status===401?"이미 가입되어 있는 기숙사입니다.":"이미 사용된 아이디입니다.");
        setSignupCheck(true);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h1 className="title">처음이신가요?</h1>
        <div className="id">
        <label htmlFor="username">사용자명</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className="passwd">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className="passwd-config">
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        </div>
        <button id="signup-button" className="signbt" onClick={handleSignup}>
          회원가입
        </button>
        {signupCheck && (
        <label  style={{color: "red"}} className="alter">{signError}</label>
        )}
        <p className="login-link">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;