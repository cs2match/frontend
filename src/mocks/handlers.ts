import { http, HttpResponse } from 'msw';
import { dummyUsers } from './dummyUsers';
import { dummyChatInfoLists } from './dummyChats';
import type { UserForRequest } from '../types/user';
import { toUser, toUserForRequest } from '../utils/utils';
import type { FilterStatusForRequest } from '../types/filter';
export const handlers = [
  http.post<{}, FilterStatusForRequest>('/userlist', async ({ request }) => {
    const {
      server,
      rating_min,
      rating_max,
      map_selection,
      mode_preference,
      age_preference,
    } = await request.json();
    return HttpResponse.json(
      dummyUsers
        .filter(({ rate, preferredModes, age, playableMaps }) => {
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
        .map((user) => {
          return {
            ...toUserForRequest(user),
            id: user.id,
            date: user.updateDate,
          };
        })
    );
  }),
  http.get<{ id: string }>('/user/:id', ({ params }) => {
    const {
      rate,
      age,
      preferredModes,
      playableMaps,
      id,
      nickname,
      updateDate,
    } = dummyUsers.filter(({ id }) => parseInt(params.id) === id)[0];
    return HttpResponse.json({
      id: id,
      name: nickname,
      date: updateDate,
      premier_rating: rate.premier,
      fiveE_rating: rate.fiveE,
      faceit_rating: rate.faceit,
      best5_rating: rate.best5,
      map_selection: playableMaps,
      mode_preference: preferredModes,
      age,
    });
  }),
  http.put<{ id: string }, UserForRequest>(
    '/user/:id',
    async ({ request, params }) => {
      const requestJson = await request.json();
      const indexToUpdate = dummyUsers.findIndex(
        (user) => user.id === parseInt(params.id)
      );
      const newUser = {
        ...requestJson,
        id: parseInt(params.id),
        date: new Date().toISOString(),
      };

      dummyUsers.splice(indexToUpdate, 1, toUser(newUser));
      return HttpResponse.json(newUser);
    }
  ),
  http.post<{}, { senderId: number; receiverId: number; content: string }>(
    '/chat',
    async ({ request }) => {
      const requestJson = await request.json();
      return HttpResponse.json(requestJson);
    }
  ),
  http.post<{}, { id: number }>('/chatlist', async ({ request }) => {
    const requestJson = await request.json();
    return HttpResponse.json(
      dummyChatInfoLists.filter(({ id }) => id === requestJson.id)
    );
  }),
];
