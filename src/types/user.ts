export interface User {
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
export interface UserFromServer {
  id: number;
  name: string;
  premier_rating: number | null;
  fiveE_rating: number | null;
  best5_rating: number | null;
  faceit_rating: number | null;
  map_selection: string[];
  mode_preference: string[];
  age: number;
  date: string | null;
}
