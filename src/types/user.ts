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
