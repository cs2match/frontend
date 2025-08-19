import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { modes } from '../constants/mode';
import { maps } from '../constants/map';
import type { User, UserFromServer } from '../types/user';
import { toggleElement, toUser, toUserForRequest } from '../utils/utils';
import AgeInput from '../components/AgeInput';
export default function Profile() {
  const [nowUser, setNowUser] = useState<User>();
  const [isRateEditingNow, setIsRateEditingNow] = useState(false);
  const [isMapEditingNow, setIsMapEditingNow] = useState(false);
  const [isAgeEditingNow, setIsAgeEditingNow] = useState(false);
  const [isModeEditingNow, setIsModeEditingNow] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const requestUserUpdate = async (userId: string) => {
    if (!nowUser) return;
    const fetchedUser: UserFromServer = await (
      await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(toUserForRequest(nowUser)),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();
    setNowUser(toUser(fetchedUser));
  };
  const fetchUser = async (userId: string) => {
    const fetchedUser: UserFromServer = await (
      await fetch(`/api/user/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();
    setNowUser(toUser(fetchedUser));
  };

  const setRate = ({
    serverType,
    score,
  }: {
    serverType: string;
    score: number;
  }) => {
    setNowUser((nowUser) => {
      if (!nowUser) return nowUser;
      switch (serverType) {
        case 'cs2_premier':
          return { ...nowUser, rate: { ...nowUser.rate, premier: score } };
        case 'fivewin':
          return { ...nowUser, rate: { ...nowUser.rate, fivewin: score } };
        case 'bestfive':
          return { ...nowUser, rate: { ...nowUser.rate, bestfive: score } };
        case 'faceit':
          return { ...nowUser, rate: { ...nowUser.rate, faceit: score } };
        default:
          return nowUser;
      }
    });
  };
  const setPlayableMaps = (mapName: string) => {
    return setNowUser((nowUser) => {
      if (!nowUser) return nowUser;
      return {
        ...nowUser,
        playableMaps: toggleElement(nowUser.playableMaps, mapName),
      };
    });
  };
  const setPreferrendModes = (modeName: string) =>
    setNowUser((nowUser) => {
      if (!nowUser) return nowUser;
      return {
        ...nowUser,
        preferredModes: toggleElement(nowUser.preferredModes, modeName),
      };
    });

  useEffect(() => {
    if (id) fetchUser(id);
  }, []);

  if (!nowUser || !id) return '죄송합니다. 현재 정보를 불러올 수 없습니다.';
  return (
    <>
      <>
        <img src={nowUser.profileUrl} alt='프로필 사진' />
        <br />
        {nowUser.nickname}
        <h2>레이팅</h2>
        {userId === id && token && (
          <button onClick={() => setIsRateEditingNow((nowValue) => !nowValue)}>
            {isRateEditingNow ? '수정완료' : '수정'}
          </button>
        )}
        {nowUser.rate.premier && !isRateEditingNow ? (
          <div>
            <strong>프리미어</strong> {nowUser.rate.premier}
          </div>
        ) : (
          ''
        )}
        {isRateEditingNow && (
          <div>
            <strong>프리미어</strong>{' '}
            <input
              type='number'
              value={nowUser.rate.premier}
              disabled={nowUser.rate.premier === 0}
              name='score_input'
              id='cs2_premier_score_input'
              onChange={(e) =>
                setRate({
                  serverType: 'cs2_premier',
                  score: parseInt(e.target.value),
                })
              }
            />
            <input
              type='checkbox'
              name='not_play'
              id='cs2_premier_not_play'
              checked={nowUser.rate.premier === 0}
              onChange={() =>
                setRate({
                  serverType: 'cs2_premier',
                  score: nowUser.rate.premier === 0 ? 1 : 0,
                })
              }
            />{' '}
            <label htmlFor=''>이용안함</label>
          </div>
        )}
        {nowUser.rate.fivewin && !isRateEditingNow ? (
          <div>
            <strong>5E</strong> {nowUser.rate.fivewin}
          </div>
        ) : (
          ''
        )}
        {isRateEditingNow && (
          <div>
            <strong>5E</strong>{' '}
            <input
              type='number'
              value={nowUser.rate.fivewin}
              disabled={nowUser.rate.fivewin === 0}
              name='score_input'
              id='fivewin_score_input'
              onChange={(e) =>
                setRate({
                  serverType: 'fivewin',
                  score: parseInt(e.target.value),
                })
              }
            />
            <input
              type='checkbox'
              name='not_play'
              id='fivewin_not_play'
              checked={nowUser.rate.fivewin === 0}
              onChange={() =>
                setRate({
                  serverType: 'fivewin',
                  score: nowUser.rate.fivewin === 0 ? 1 : 0,
                })
              }
            />{' '}
            <label htmlFor=''>이용안함</label>
          </div>
        )}
        {nowUser.rate.bestfive && !isRateEditingNow ? (
          <div>
            <strong>베스트파이브</strong>
            {nowUser.rate.bestfive}
          </div>
        ) : (
          ''
        )}
        {isRateEditingNow && (
          <div>
            <strong>베스트파이브</strong>{' '}
            <input
              type='number'
              value={nowUser.rate.bestfive}
              disabled={nowUser.rate.bestfive === 0}
              name='score_input'
              id='bestfive_score_input'
              onChange={(e) =>
                setRate({
                  serverType: 'bestfive',
                  score: parseInt(e.target.value),
                })
              }
            />
            <input
              type='checkbox'
              name='not_play'
              id='bestfive_not_play'
              checked={nowUser.rate.bestfive === 0}
              onChange={() =>
                setRate({
                  serverType: 'bestfive',
                  score: nowUser.rate.bestfive === 0 ? 1 : 0,
                })
              }
            />{' '}
            <label htmlFor=''>이용안함</label>
          </div>
        )}
        {nowUser.rate.faceit && !isRateEditingNow ? (
          <div>
            <strong>페이스잇 </strong>
            {nowUser.rate.faceit}
          </div>
        ) : (
          ''
        )}
        {isRateEditingNow && (
          <div>
            <strong>페이스잇</strong>{' '}
            <input
              type='number'
              value={nowUser.rate.faceit}
              disabled={nowUser.rate.faceit === 0}
              name='score_input'
              id='bestfive_score_input'
              onChange={(e) =>
                setRate({
                  serverType: 'faceit',
                  score: parseInt(e.target.value),
                })
              }
            />
            <input
              type='checkbox'
              name='not_play'
              id='bestfive_not_play'
              checked={nowUser.rate.faceit === 0}
              onChange={() =>
                setRate({
                  serverType: 'faceit',
                  score: nowUser.rate.faceit === 0 ? 1 : 0,
                })
              }
            />{' '}
            <label htmlFor=''>이용안함</label>
          </div>
        )}
        <h2>가능맵</h2>
        {userId === id && token && (
          <button onClick={() => setIsMapEditingNow((nowValue) => !nowValue)}>
            {isMapEditingNow ? '수정완료' : '수정'}
          </button>
        )}
        {!isMapEditingNow &&
          maps
            .filter(({ name }) => nowUser.playableMaps.includes(name))
            .map(({ nameKorean }) => <span>{nameKorean} </span>)}
        {isMapEditingNow &&
          maps.map(({ name, nameKorean }) => (
            <>
              <input
                type='checkbox'
                name='map_checkbox'
                id={`map_checkbox_${name}`}
                checked={nowUser.playableMaps.includes(name)}
                onChange={() => setPlayableMaps(name)}
              />
              <label htmlFor={`map_checkbox_${name}`}>{nameKorean} </label>
            </>
          ))}
        <h2>나이</h2>
        {userId === id && token && (
          <button onClick={() => setIsAgeEditingNow((nowValue) => !nowValue)}>
            {isAgeEditingNow ? '수정완료' : '수정'}
          </button>
        )}
        {nowUser.age > 0 && !isAgeEditingNow ? `${nowUser.age}세` : ''}
        {nowUser.age === 0 && !isAgeEditingNow ? `비공개` : ''}
        {isAgeEditingNow && (
          <AgeInput
            age={nowUser.age}
            setAge={(age) => {
              setNowUser((nowUser) => {
                if (!nowUser) return nowUser;
                return { ...nowUser, age };
              });
            }}
          />
        )}
        <h2>선호 게임 모드</h2>
        {userId === id && token && (
          <button onClick={() => setIsModeEditingNow((nowValue) => !nowValue)}>
            {isModeEditingNow ? '수정완료' : '수정'}
          </button>
        )}
        {!isModeEditingNow &&
          modes
            .filter(({ name }) => nowUser.preferredModes.includes(name))
            .map(({ nameKorean }) => <span>{nameKorean} </span>)}
        {isModeEditingNow &&
          modes.map(({ name, nameKorean }) => (
            <>
              <input
                type='checkbox'
                name='mode_checkbox'
                id={`mode_checkbox_${name}`}
                checked={nowUser.preferredModes.includes(name)}
                onChange={() => setPreferrendModes(name)}
              />
              <label htmlFor={`mode_checkbox_${name}`}>{nameKorean} </label>
            </>
          ))}
        {userId === id && token && (
          <button onClick={() => requestUserUpdate(id)}>
            갱신 후 리스트 올리기
          </button>
        )}
        {nowUser.updateDate
          ? `마지막 갱신일자: ${nowUser.updateDate}`
          : '로그인 후 위의 올리기 버튼을 눌러야 리스트에 유저 정보가 표시됩니다.'}
        {userId === id && token && <button>채팅하기</button>}
      </>
    </>
  );
}
