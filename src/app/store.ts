import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import offersReducer from "../features/api/offersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    offers: offersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
