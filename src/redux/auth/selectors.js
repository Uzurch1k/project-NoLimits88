export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectToken = state => state.auth.token;
export const selectRefreshToken = state => state.auth.refreshToken;

export const selectUserCount = state => state.auth.userCount;
export const selectUserDailyNorma = state => state.auth.user.amountOfWater;
