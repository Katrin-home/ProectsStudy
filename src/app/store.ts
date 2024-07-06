import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import auth from "../features/authSlice"
import code from "../features/codeSlice"
import products from "../features/productSlice"

export const store = configureStore({
  reducer: { auth, code, products },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
