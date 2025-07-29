import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { dummyUsers } from '../mocks/dummyUsers';
const ages = [
  { range: 'private', serverValue: 0, koreanName: '비공개' },
  { range: '20_or_less', serverValue: 20, koreanName: '20대 이하' },
  { range: '30', serverValue: 30, koreanName: '30대' },
  { range: '40_or_more', serverValue: 40, koreanName: '40대 이상' },
];
const maps = [
  { name: 'dust2', nameKorean: '더스트2' },
  { name: 'inferno', nameKorean: '인페르노' },
  { name: 'mirage', nameKorean: '신기루' },
  { name: 'nuke', nameKorean: '뉴크' },
  { name: 'anubis', nameKorean: '아누비스' },
  { name: 'ancient', nameKorean: '고대' },
  { name: 'italy', nameKorean: '이탈리아' },
  { name: 'office', nameKorean: '사무실' },
  { name: 'overpass', nameKorean: '오버패스' },
  { name: 'vertigo', nameKorean: '버티고' },
  { name: 'train', nameKorean: '열차' },
  { name: 'jura', nameKorean: '쥐라' },
  { name: 'grail', nameKorean: '그레일' },
  { name: 'agency', nameKorean: '에이전시' },
];

const modes = [
  { name: 'premier', nameKorean: '프리미어' },
  { name: 'competitive', nameKorean: '경쟁' },
  { name: 'wingman', nameKorean: '윙맨' },
  { name: 'arms_race', nameKorean: '무기레이스' },
  { name: 'deathmatch', nameKorean: '데스매치' },
  { name: 'casual', nameKorean: '캐주얼' },
  { name: 'community_server', nameKorean: '커뮤니티 서버' },
];

const servers = [
  { name: 'cs2_premier', nameKorean: '프리미어' },
  { name: 'fiveE', nameKorean: '5E' },
  { name: 'faceit', nameKorean: '페이스잇' },
  { name: 'best5', nameKorean: '베스트파이브' },
];

console.log(dummyUsers);
const toggleElement = (arr: Array<any>, value: any) => {
  return arr.includes(value)
    ? arr.filter((element) => element !== value)
    : [...arr, value];
};
interface filterStatus {
  rate: {
    serverType: string;
    minScore: number;
    maxScore: number;
  };
  playableMaps: string[];
  preferredModes: string[];
  preferredAges: string[];
}

interface User {
  id: number;
  profileUrl: string;
  nickname: string;
  rate: {
    premier: number | null;
    fiveE: number | null;
    best5: number | null;
    faceit: number | null;
  };
  playableMaps: string[];
  preferredModes: string[];
  age: number;
  updateDate: string;
}

function Home() {
  const [filterStatus, setFilter] = useState<filterStatus>({
    rate: {
      serverType: 'cs2_premier',
      minScore: 0,
      maxScore: 30000,
    },
    playableMaps: [...maps.map(({ name }) => name)],
    preferredModes: [...modes.map(({ name }) => name)],
    preferredAges: [...ages.map(({ range }) => range)],
  });

  const fetchUserList = async (filterStatus: filterStatus) => {
    const fetchedJson: User[] = await (
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
      fetchedJson.sort(
        (a, b) =>
          new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
      )
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
  const setPrayableMaps = (mapName: string) =>
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
                  setPrayableMaps(name);
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
            );
          }
        )}
      </div>
    </>
  );
}

export default Home;
