import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import entryReducer from '../features/entries/entrySlice';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    entry: entryReducer,
    modal: modalReducer,
  },
});
