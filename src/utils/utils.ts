import type { ChatInfo } from '../types/chats';
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
  fivewin_rating,
  bestfive_rating,
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
      bestfive: bestfive_rating,
      fivewin: fivewin_rating,
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
    fivewin_rating: rate.fivewin,
    faceit_rating: rate.faceit,
    bestfive_rating: rate.bestfive,
    map_selection: playableMaps,
    mode_preference: preferredModes,
    age,
  };
};

export const compareRecent = (
  a: { date: string | null },
  b: { date: string | null }
) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();
