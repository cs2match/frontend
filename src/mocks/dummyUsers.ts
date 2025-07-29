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
  updateDate: string | null;
}

export const dummyUsers: User[] = [
  {
    id: 1,
    profileUrl: 'http://cataas.com/cat',
    nickname: '에임장인',
    rate: {
      premier: 2100,
      fiveE: 1800,
      best5: null,
      faceit: 1000,
    },
    playableMaps: ['dust2', 'mirage', 'nuke'],
    preferredModes: ['premier', 'competitive'],
    age: 21,
    updateDate: '2025-07-05T15:30:00.000Z',
  },
  {
    id: 2,
    profileUrl: 'http://cataas.com/cat',
    nickname: '전략가',
    rate: {
      premier: null,
      fiveE: 1700,
      best5: 1500,
      faceit: null,
    },
    playableMaps: ['inferno', 'anubis', 'overpass'],
    preferredModes: ['wingman', 'deathmatch'],
    age: 30,
    updateDate: '2025-06-03T18:45:00.000Z',
  },
  {
    id: 3,
    profileUrl: 'http://cataas.com/cat',
    nickname: '뉴비',
    rate: {
      premier: 1000,
      fiveE: null,
      best5: null,
      faceit: null,
    },
    playableMaps: ['italy', 'office'],
    preferredModes: ['casual', 'community_server'],
    age: 19,
    updateDate: '2025-06-02T12:10:00.000Z',
  },
  {
    id: 4,
    profileUrl: 'http://cataas.com/cat',
    nickname: '맵마스터',
    rate: {
      premier: 2500,
      fiveE: null,
      best5: 1600,
      faceit: null,
    },
    playableMaps: ['vertigo', 'train', 'grail', 'agency'],
    preferredModes: ['premier', 'arms_race'],
    age: 42,
    updateDate: '2025-06-06T07:30:00.000Z',
  },
];
