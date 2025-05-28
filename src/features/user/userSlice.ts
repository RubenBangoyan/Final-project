import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  name: string | null;
  surname: string | null;
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  name: null,
  surname: null,
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
      console.log('USER SET IN REDUCER:', action.payload);

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

    removeUser: () => initialState,
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
