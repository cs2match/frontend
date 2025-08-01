export interface FilterStatus {
  rate: {
    serverType: string;
    minScore: number;
    maxScore: number;
  };
  playableMaps: string[];
  preferredModes: string[];
  preferredAges: string[];
}
export interface FilterStatusForRequest {
  server: string;
  rating_min: number;
  rating_max: number;
  map_selection: string[];
  mode_preference: string[];
  age_preference: number[];
}
