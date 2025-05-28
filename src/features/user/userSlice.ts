import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from "../../pages/profilePage/ProfilePage.tsx";

interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  name: string | null;
  surname: string | null;
  profile: UserProfile | null;
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  name: null,
  surname: null,
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
        state,
        action: PayloadAction<{
          email: string;
          token: string;
          id: string;
          name?: string;
          surname?: string;
        }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      if (action.payload.name !== undefined) {
        state.name = action.payload.name;
      }
      if (action.payload.surname !== undefined) {
        state.surname = action.payload.surname;
      }
    },
    updateProfile: (
        state,
        action: PayloadAction<UserProfile>
    ) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.profile = action.payload;
    },
    removeUser: () => initialState,
  },
});

export const { setUser, updateProfile, removeUser } = userSlice.actions;
export default userSlice.reducer;
