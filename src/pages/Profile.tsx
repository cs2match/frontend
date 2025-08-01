import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { modes } from '../constants/mode';
import { maps } from '../constants/map';
import type { User, UserFromServer } from '../types/user';
import { toggleElement, toUser, toUserForRequest } from '../utils/utils';
export default function Profile() {
  const [nowUser, setNowUser] = useState<User>();
  const [isRateEditingNow, setIsRateEditingNow] = useState(false);
  const [isMapEditingNow, setIsMapEditingNow] = useState(false);
  const [isAgeEditingNow, setIsAgeEditingNow] = useState(false);
  const [isModeEditingNow, setIsModeEditingNow] = useState(false);
  const { id } = useParams();
  const requestUserUpdate = async (userId: string) => {
    if (!nowUser) return;
    const fetchedUser: UserFromServer = await (
      await fetch(`/user/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(toUserForRequest(nowUser)),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();
    setNowUser(toUser(fetchedUser));
  };
  const fetchUser = async (userId: string) => {
    const fetchedUser: UserFromServer = await (
      await fetch(`/user/${userId}`, {
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
    score: number | null;
  }) => {
    setNowUser((nowUser) => {
      if (!nowUser) return nowUser;
      switch (serverType) {
        case 'cs2_premier':
          return { ...nowUser, rate: { ...nowUser.rate, premier: score } };
        case 'fiveE':
          return { ...nowUser, rate: { ...nowUser.rate, fiveE: score } };
        case 'best5':
          return { ...nowUser, rate: { ...nowUser.rate, best5: score } };
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
        <button onClick={() => setIsRateEditingNow((nowValue) => !nowValue)}>
          {isRateEditingNow ? '수정완료' : '수정'}
        </button>
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
              value={nowUser.rate.premier ?? 1000}
              disabled={nowUser.rate.premier === null}
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
              checked={nowUser.rate.premier === null}
              onChange={() =>
                setRate({
                  serverType: 'cs2_premier',
                  score: nowUser.rate.premier === null ? 1000 : null,
                })
              }
            />{' '}
            <label htmlFor=''>이용안함</label>
          </div>
        )}
        {nowUser.rate.fiveE && !isRateEditingNow ? (
          <div>
            <strong>5E</strong> {nowUser.rate.fiveE}
          </div>
        ) : (
          ''
        )}
        {isRateEditingNow && (
          <div>
            <strong>5E</strong>{' '}
            <input
              type='number'
              value={nowUser.rate.fiveE ?? 1000}
              disabled={nowUser.rate.fiveE === null}
              name='score_input'
              id='fiveE_score_input'
              onChange={(e) =>
                setRate({
                  serverType: 'fiveE',
                  score: parseInt(e.target.value),
                })
              }
            />
            <input
              type='checkbox'
              name='not_play'
              id='fiveE_not_play'
              checked={nowUser.rate.fiveE === null}
              onChange={() =>
                setRate({
                  serverType: 'fiveE',
                  score: nowUser.rate.fiveE === null ? 1000 : null,
                })
              }
            />{' '}
            <label htmlFor=''>이용안함</label>
          </div>
        )}
        {nowUser.rate.best5 && !isRateEditingNow ? (
          <div>
            <strong>베스트파이브</strong>
            {nowUser.rate.best5}
          </div>
        ) : (
          ''
        )}
        {isRateEditingNow && (
          <div>
            <strong>베스트파이브</strong>{' '}
            <input
              type='number'
              value={nowUser.rate.best5 ?? 1000}
              disabled={nowUser.rate.best5 === null}
              name='score_input'
              id='best5_score_input'
              onChange={(e) =>
                setRate({
                  serverType: 'best5',
                  score: parseInt(e.target.value),
                })
              }
            />
            <input
              type='checkbox'
              name='not_play'
              id='best5_not_play'
              checked={nowUser.rate.best5 === null}
              onChange={() =>
                setRate({
                  serverType: 'best5',
                  score: nowUser.rate.best5 === null ? 1000 : null,
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
              value={nowUser.rate.faceit ?? 1000}
              disabled={nowUser.rate.faceit === null}
              name='score_input'
              id='best5_score_input'
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
              id='best5_not_play'
              checked={nowUser.rate.faceit === null}
              onChange={() =>
                setRate({
                  serverType: 'faceit',
                  score: nowUser.rate.faceit === null ? 1000 : null,
                })
              }
            />{' '}
            <label htmlFor=''>이용안함</label>
          </div>
        )}
        <h2>가능맵</h2>
        <button onClick={() => setIsMapEditingNow((nowValue) => !nowValue)}>
          {isMapEditingNow ? '수정완료' : '수정'}
        </button>
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
        <button onClick={() => setIsAgeEditingNow((nowValue) => !nowValue)}>
          {isAgeEditingNow ? '수정완료' : '수정'}
        </button>
        {nowUser.age > 0 && !isAgeEditingNow ? `${nowUser.age}세` : ''}
        {nowUser.age === 0 && !isAgeEditingNow ? `비공개` : ''}
        {isAgeEditingNow && (
          <div>
            <input
              type='number'
              name='age_number'
              id='age_input'
              value={nowUser.age}
              disabled={nowUser.age === 0}
              onChange={(e) =>
                setNowUser((nowUser) => {
                  if (!nowUser) return nowUser;
                  return { ...nowUser, age: parseInt(e.target.value) };
                })
              }
            />
            <input
              type='checkbox'
              name='age_private'
              id='age_private_checkbox'
              checked={nowUser.age === 0}
              onChange={() =>
                setNowUser((nowUser) => {
                  if (!nowUser) return nowUser;
                  return { ...nowUser, age: nowUser.age === 0 ? 20 : 0 };
                })
              }
            />
            <label htmlFor='age_private_checkbox'>공개하고 싶지 않아요</label>
          </div>
        )}
        <h2>선호 게임 모드</h2>
        <button onClick={() => setIsModeEditingNow((nowValue) => !nowValue)}>
          {isModeEditingNow ? '수정완료' : '수정'}
        </button>
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
        <button onClick={() => requestUserUpdate(id)}>
          갱신 후 리스트 올리기
        </button>
        {nowUser.updateDate
          ? `마지막 갱신일자: ${nowUser.updateDate}`
          : '로그인 후 위의 올리기 버튼을 눌러야 리스트에 유저 정보가 표시됩니다.'}
        <button>채팅하기</button>
      </>
    </>
  );
}
