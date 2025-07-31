import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { maps } from '../constants/map';
import { servers } from '../constants/server';
import { ages } from '../constants/age';
import { modes } from '../constants/mode';
import type { User, UserFromServer } from '../types/user';
import type { FilterStatus } from '../types/filter';
import { toUser, toggleElement } from '../utils/utils';
function Home() {
  const [filterStatus, setFilter] = useState<FilterStatus>({
    rate: {
      serverType: 'cs2_premier',
      minScore: 0,
      maxScore: 30000,
    },
    playableMaps: [...maps.map(({ name }) => name)],
    preferredModes: [...modes.map(({ name }) => name)],
    preferredAges: [...ages.map(({ range }) => range)],
  });

  const fetchUserList = async (filterStatus: FilterStatus) => {
    const fetchedJson: UserFromServer[] = await (
      await fetch('/userlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          server: filterStatus.rate.serverType,
          rating_min: filterStatus.rate.minScore,
          rating_max: filterStatus.rate.maxScore,
          map_selection: filterStatus.playableMaps,
          mode_preference: filterStatus.preferredModes,
          age_preference: ages
            .filter(({ range }) => filterStatus.preferredAges.includes(range))
            .map(({ serverValue }) => serverValue),
        }),
      })
    ).json();
    setUserArray(
      fetchedJson
        .sort(
          (a, b) =>
            new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
        )
        .map(toUser)
    );
  };

  useEffect(() => {
    fetchUserList(filterStatus);
  }, [filterStatus]);

  const setRate = ({
    serverType,
    minScore,
    maxScore,
  }: {
    serverType?: string;
    minScore?: number;
    maxScore?: number;
  }) => {
    setFilter((filterStatus) => {
      return {
        ...filterStatus,
        rate: {
          serverType: serverType ?? filterStatus.rate.serverType,
          minScore: minScore ?? filterStatus.rate.minScore,
          maxScore: maxScore ?? filterStatus.rate.maxScore,
        },
      };
    });
  };
  const setPlayableMaps = (mapName: string) =>
    setFilter((filterStatus) => {
      return {
        ...filterStatus,
        playableMaps: toggleElement(filterStatus.playableMaps, mapName),
      };
    });
  const setPreferredModes = (modeName: string) =>
    setFilter((filterStatus) => {
      return {
        ...filterStatus,
        preferredModes: toggleElement(filterStatus.preferredModes, modeName),
      };
    });
  const setPreferredAges = (ageRange: string) =>
    setFilter((filterStatus) => {
      return {
        ...filterStatus,
        preferredAges: toggleElement(filterStatus.preferredAges, ageRange),
      };
    });
  const [userArray, setUserArray] = useState<User[]>([]);
  return (
    <>
      <Link to='/'>
        <img src='logo.svg' alt='로고' />
      </Link>
      <div>
        필터
        <div>
          레이팅 <br />
          <input
            type='number'
            name='rate_score'
            id='min_score'
            value={filterStatus.rate.minScore}
            onChange={(e) => setRate({ minScore: parseInt(e.target.value) })}
          />{' '}
          ~{' '}
          <input
            type='number'
            name='rate_score'
            id='max_score'
            value={filterStatus.rate.maxScore}
            onChange={(e) => setRate({ maxScore: parseInt(e.target.value) })}
          />{' '}
          <br />
          {servers.map(({ name, nameKorean }) => (
            <>
              <input
                type='radio'
                name='server'
                checked={name === filterStatus.rate.serverType}
                id={`rating_${name}`}
                onChange={(_) => setRate({ serverType: name })}
              />{' '}
              <label htmlFor={`rating_${name}`}>{nameKorean}</label>
            </>
          ))}
        </div>
        <div>
          가능 맵 <br />
          {maps.map(({ name, nameKorean }) => (
            <>
              <input
                type='checkbox'
                name='map'
                id={`map_${name}`}
                checked={filterStatus.playableMaps.includes(name)}
                onChange={() => {
                  setPlayableMaps(name);
                }}
              />{' '}
              <label htmlFor={`map_${name}`}>{nameKorean}</label>
            </>
          ))}
        </div>
        <div>
          선호 게임 모드 <br />
          {modes.map(({ name, nameKorean }) => (
            <>
              <input
                type='checkbox'
                name='mode'
                id={`mode_${name}`}
                checked={filterStatus.preferredModes.includes(name)}
                onChange={() => {
                  setPreferredModes(name);
                }}
              />{' '}
              <label htmlFor={`mode_${name}`}>{nameKorean}</label>
            </>
          ))}
        </div>
      </div>
      <div>
        나이 <br />
        {ages.map(({ range, koreanName }) => (
          <>
            <input
              type='checkbox'
              name='mode'
              id={`age_${range}`}
              checked={filterStatus.preferredAges.includes(range)}
              onChange={() => {
                setPreferredAges(range);
              }}
            />{' '}
            <label htmlFor={`age_${range}`}>{koreanName}</label>
          </>
        ))}
      </div>
      <div>
        {userArray.map(
          ({
            id,
            profileUrl,
            nickname,
            rate,
            playableMaps,
            age,
            preferredModes,
            updateDate,
          }) => {
            return (
              updateDate && (
                <div key={id}>
                  <Link to={`/profile/${id}`}>
                    <img
                      src={profileUrl}
                      width={50}
                      height={50}
                      alt='profile_picture'
                    />{' '}
                    / {nickname} /
                    {rate.premier ? `프리미어: ${rate.premier}` : ''}
                    {rate.fiveE ? `5E: ${rate.fiveE}` : ''}
                    {rate.faceit ? `페이스잇: ${rate.faceit}` : ''}
                    {rate.best5 ? `베스트파이브: ${rate.best5}` : ''}/
                    {maps
                      .filter(({ name }) => playableMaps.includes(name))
                      .map(({ nameKorean }) => nameKorean)
                      .join(',')}
                    /
                    {modes
                      .filter(({ name }) => preferredModes.includes(name))
                      .map(({ nameKorean }) => nameKorean)
                      .join(',')}
                    / {age}세 / 갱신일 :{' '}
                    {Math.floor(
                      (new Date().getTime() - new Date(updateDate).getTime()) /
                        (24 * 60 * 60000)
                    )}
                    일 전
                  </Link>
                </div>
              )
            );
          }
        )}
      </div>
    </>
  );
}

export default Home;
