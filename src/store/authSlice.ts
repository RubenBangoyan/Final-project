import { createSlice } from '@reduxjs/toolkit';

interface UserInfo {
    id: string;
    email: string;
    name: string;
    surname: string;
    phone: string;
    city: string;
}

interface AuthState {
    user: UserInfo | null;
}

const initialState: AuthState = {
    user: {
        id: '1',
        email: 'example@example.com',
        name: 'John',
        surname: 'Doe',
        phone: '123456789',
        city: 'Yerevan',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
        },
        // Add more reducers as needed
    },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
