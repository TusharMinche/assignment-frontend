import { configureStore } from '@reduxjs/toolkit';
import creditReportReducer from './slices/creditReportSlice';

export const store = configureStore({
  reducer: {
    creditReports: creditReportReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;