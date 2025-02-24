import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/userReducer.ts';
import itemsReducer from './auth/itemsReducers.ts';
import admxReducer from './auth/admxReducers.ts';
const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    admx:admxReducer,
  },
});

export default store;