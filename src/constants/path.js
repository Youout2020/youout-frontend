import ROUTE from './route';

export default {
  userHistory: `${ROUTE.games}?type=user&selection=history`,
  userGames: `${ROUTE.games}?type=user&selection=games`,
  gamesLocation: ({ lat, lng, page = 1 }) => (
    `${ROUTE.games}?type=location&lat=${lat}&lng=${lng}&page=${page}`
  ),
  gameId: (gameId) => (
    `${ROUTE.games}/${gameId}`
  ),
};
