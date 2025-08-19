export interface User {
  id: number;
  profileUrl: string;
  nickname: string;
  rate: {
    premier: number;
    fivewin: number;
    bestfive: number;
    faceit: number;
  };
  playableMaps: string[];
  preferredModes: string[];
  age: number;
  updateDate: string | null;
}
export interface UserForRequest {
  name: string;
  premier_rating: number;
  fivewin_rating: number;
  bestfive_rating: number;
  faceit_rating: number;
  map_selection: string[];
  mode_preference: string[];
  age: number;
}
export interface UserFromServer extends UserForRequest {
  id: number;
  date: string | null;
  nickname?: string;
  available_maps?: string[];
  preferred_modes?: string[];
  updated_at: string;
}

export interface UserDetail extends User {
  email: string;
  password: string;
}
