import { useState } from 'react';
import MapCheckbox from '../components/MapCheckbox';
import { toggleElement } from '../utils/utils';
import AgeInput from '../components/AgeInput';
export default function Register() {
  const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean | null>(
    null
  );
  const validate = () => {
    if (nickname === '') {
      alert('닉네임을 입력해주세요.');
      return false;
    }
    if (email === '') {
      alert('이메일을 입력해주세요.');
      return false;
    }
    if (isEmailDuplicated === null) {
      alert('이메일 중복검사를 해주세요.');
      return false;
    }
    if (isEmailDuplicated) {
      alert('중복된 이메일은 사용하실 수 없습니다.');
      return false;
    }
    if (password === '') {
      alert('비밀번호를 입력해주세요.');
      return false;
    }
    if (playableMaps.length === 0) {
      alert('플레이 가능한 맵을 적어도 하나는 입력해주세요');
      return false;
    }
    return true;
  };
  const requestRegister = async () => {
    if (!validate()) return false;
    try {
      const response = await fetch('user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          nickname,
          age,
          password,
          map_selection: playableMaps,
        }),
      });
      if (!response.ok) throw new Error('HTTP 오류');
      return true;
    } catch (error) {
      console.error(error);
    }
  };
  const checkEmailDuplicated = async (email: string) => {
    try {
      const response = await fetch('user/duplicate_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('HTTP 오류');
      const json = await response.json();
      if (json.isDuplicated) return true;
      return false;
    } catch (error) {
      console.error(error);
    }
  };
  const onClickCheckDuplicateButton = () => {
    if (email === '') {
      alert('먼저 이메일을 입력해주세요.');
      return;
    }
    checkEmailDuplicated(email).then((isDuplicated) => {
      if (isDuplicated) {
        setIsEmailDuplicated(true);
        alert('이미 가입된 이메일입니다.');
      } else {
        setIsEmailDuplicated(false);
        alert('사용가능한 이메일 입니다');
      }
    });
  };
  const [playableMaps, setPlayableMaps] = useState<string[]>([]);
  const [age, setAge] = useState(20);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <h1>회원가입</h1>
      <label htmlFor='nickname_input'>닉네임</label>
      <input
        type='text'
        name='register_input'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        id='nickname_input'
      />
      <br />
      <label htmlFor='email_input'>이메일</label>
      <input
        type='email'
        name='register_input'
        id='email_input'
        value={email}
        onChange={(e) => {
          setIsEmailDuplicated(null);
          setEmail(e.target.value);
        }}
      />
      <button onClick={onClickCheckDuplicateButton}>중복확인</button>
      <br />
      <label htmlFor='password_input'>비밀번호</label>
      <input
        type='password'
        name='register_input'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id='password_input'
      />
      <br />
      <label htmlFor='map_checkbox'>가능맵 선택</label> <br />
      <MapCheckbox
        nowCheck={playableMaps}
        setChecked={(name) => {
          setPlayableMaps(toggleElement(playableMaps, name));
        }}
      />
      <AgeInput age={age} setAge={setAge} />
      <br />
      <button
        onClick={() => {
          requestRegister().then((isSuccess) => {
            if (isSuccess) alert('회원가입을 성공하셨습니다.');
          });
        }}
      >
        가입
      </button>
    </>
  );
}
