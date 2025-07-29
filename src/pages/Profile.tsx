import { useEffect, useState } from 'react';
import { dummyUsers } from '../mocks/dummyUsers';
import { useParams } from 'react-router-dom';
import { modes } from '../constants/mode';
import { maps } from '../constants/map';
export default function Profile() {
  const { id } = useParams();
  return (
    <>
      <img src={dummyUsers[0].profileUrl} alt='프로필 사진' />
      <br />
      {dummyUsers[0].nickname}
      <h2>레이팅</h2>
      <button>수정</button>
      {dummyUsers[0].rate.premier && (
        <div>
          <strong>프리미어</strong> {dummyUsers[0].rate.premier}
        </div>
      )}
      {dummyUsers[0].rate.fiveE && (
        <div>
          <strong>5E</strong> {dummyUsers[0].rate.fiveE}
        </div>
      )}
      {dummyUsers[0].rate.best5 && (
        <div>
          <strong>베스트파이브</strong>
          {dummyUsers[0].rate.best5}
        </div>
      )}
      {dummyUsers[0].rate.faceit && (
        <div>
          <strong>페이스잇 </strong>
          {dummyUsers[0].rate.faceit}
        </div>
      )}
      <h2>가능맵</h2>
      {maps
        .filter(({ name }) => dummyUsers[0].playableMaps.includes(name))
        .map(({ nameKorean }) => (
          <span>{nameKorean} </span>
        ))}
      <h2>나이</h2>
      {dummyUsers[0].age > 0 && `${dummyUsers[0].age}세`}
      <h2>선호 게임 모드</h2>
      {modes
        .filter(({ name }) => dummyUsers[0].preferredModes.includes(name))
        .map(({ nameKorean }) => (
          <span>{nameKorean} </span>
        ))}
    </>
  );
}
