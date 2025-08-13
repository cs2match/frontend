import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let navigate = useNavigate();
  const requestLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('HTTP 오류');
      const json = await response.json();
      if (!json.isSuccess) return false;
      return true;
    } catch (error) {
      console.error(error);
    }
  };
  const onClickLoginButton = () => {
    if (!validate()) return false;
    requestLogin(email, password).then((isSuccess) => {
      if (isSuccess) {
        alert('로그인을 성공했습니다');
        navigate('/');
      } else {
        alert('이메일 또는 비밀번호를 확인해주세요.');
      }
    });
  };
  const validate = () => {
    if (email === '') {
      alert('이메일을 입력해주세요.');
      return false;
    }
    if (password === '') {
      alert('비밀번호를 입력해주세요.');
      return false;
    }
    return true;
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <label htmlFor='email_input'>이메일</label>
      <input
        type='email'
        name='login_input'
        id='email_input'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <label htmlFor='password_input'>비밀번호</label>
      <input
        type='password'
        name='login_input'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id='password_input'
      />
      <br />
      <button onClick={onClickLoginButton}>로그인</button>
    </>
  );
}
