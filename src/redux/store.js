import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { setupInterceptors } from './auth/operations';
import { authReducer } from './auth/slice';
// import { waterReducer } from './water/slice';

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token', 'refreshToken'],
};

// const waterPersistConfig = {
//   key: 'water',
//   version: 1,
//   storage,
//   whitelist: [
//     'selectedDate',
//     'selectedDateData',
//     'selectedMonth',
//     'monthData',
//     'toggleInfo',
//   ],
// };

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
// const persistedWaterReducer = persistReducer(waterPersistConfig, waterReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // water: persistedWaterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupInterceptors(store);

export const persistor = persistStore(store);
