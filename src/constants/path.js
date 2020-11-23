export default {
  userHistory: '/games?type=user&selection=history',
  userGames: '/games?type=user&selection=games',
  gamesLocation: ({ lat, lng, page = 1 }) => (
    `/games?type=location&lat=${lat}&lng=${lng}&page=${page}`
  ),
  gameId: (gameId) => (
    `/games/${gameId}`
  ),
};
