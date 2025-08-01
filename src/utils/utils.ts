import type { User, UserFromServer } from '../types/user';

export const toggleElement = (arr: Array<any>, value: any) => {
  return arr.includes(value)
    ? arr.filter((element) => element !== value)
    : [...arr, value];
};
export const toUser = ({
  id,
  name,
  premier_rating,
  fiveE_rating,
  best5_rating,
  faceit_rating,
  map_selection,
  mode_preference,
  age,
  date,
}: UserFromServer): User => {
  return {
    id,
    nickname: name,
    profileUrl: 'https://cataas.com/cat',
    rate: {
      premier: premier_rating,
      best5: best5_rating,
      fiveE: fiveE_rating,
      faceit: faceit_rating,
    },
    playableMaps: map_selection,
    preferredModes: mode_preference,
    age,
    updateDate: date,
  };
};
export const toUserForRequest = ({
  nickname,
  rate,
  playableMaps,
  preferredModes,
  age,
}: User) => {
  return {
    name: nickname,
    premier_rating: rate.premier,
    fiveE_rating: rate.fiveE,
    faceit_rating: rate.faceit,
    best5_rating: rate.best5,
    map_selection: playableMaps,
    mode_preference: preferredModes,
    age,
  };
};
