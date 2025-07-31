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
