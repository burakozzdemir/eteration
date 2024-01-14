import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';

export type AppStore = ReturnType<typeof configureStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
