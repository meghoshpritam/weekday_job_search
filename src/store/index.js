import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './slices/job';

export const store = configureStore({
  reducer: {
    job: jobReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
