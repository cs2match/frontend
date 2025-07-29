import { http, HttpResponse } from 'msw';
import { dummyUsers } from './dummyUsers';

export const handlers = [
  http.post<
    {},
    {
      server: string;
      rating_min: number;
      rating_max: number;
      map_selection: string[];
      mode_preference: string[];
      age_preference: number[];
    }
  >('/userlist', async ({ request }) => {
    const {
      server,
      rating_min,
      rating_max,
      map_selection,
      mode_preference,
      age_preference,
    } = await request.json();
    return HttpResponse.json(
      dummyUsers.filter(({ rate, preferredModes, age, playableMaps }) => {
        if (!map_selection.some((name) => playableMaps.includes(name))) {
          return false;
        }

        if (!mode_preference.some((name) => preferredModes.includes(name))) {
          return false;
        }

        if (0 < age && age <= 29 && !age_preference.includes(20)) {
        }
        if (age === 0 && !age_preference.includes(0)) {
          return false;
        }

        if (30 <= age && age <= 39 && !age_preference.includes(30)) {
          return false;
        }
        if (40 <= age && !age_preference.includes(40)) {
          return false;
        }
        if (rate.premier === null && server === 'cs2_premier') return false;
        if (rate.fiveE === null && server === 'fiveE') return false;
        if (rate.best5 === null && server === 'best5') return false;
        if (rate.faceit === null && server === 'faceit') return false;

        if (
          rate.premier &&
          server === 'cs2_premier' &&
          (rating_min > rate.premier || rating_max < rate.premier)
        )
          return false;
        if (
          rate.fiveE &&
          server === 'fiveE' &&
          (rating_min > rate.fiveE || rating_max < rate.fiveE)
        )
          return false;
        if (
          rate.best5 &&
          server === 'best5' &&
          (rating_min > rate.best5 || rating_max < rate.best5)
        )
          return false;
        if (
          rate.faceit &&
          server === 'faceit' &&
          (rating_min > rate.faceit || rating_max < rate.faceit)
        )
          return false;
        return true;
      })
    );
  }),
];
