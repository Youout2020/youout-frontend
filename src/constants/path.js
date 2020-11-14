import ROUTE from './route';

export default {
  userHistory: `${ROUTE.games}?type=user&selection=history`,
  userGames: `${ROUTE.games}?type=user&selection=games`,
  gamesLocation: ({ lat, lng, page = '' }) => (
    `${ROUTE.games}?type=location&lat=${lat}&lng=${lng}&page=${page}`
  ),
};
