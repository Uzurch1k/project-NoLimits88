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
import { waterReducer } from './water/slice';

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token', 'refreshToken'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    water: waterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'water/setMonth',
        ],
      },
    }),
});

setupInterceptors(store);

export const persistor = persistStore(store);
