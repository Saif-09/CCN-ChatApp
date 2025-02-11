import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setItem, getItem, removeItem } from '../../utils/mmkvStorage';


const BASE_URL = 'http://50.17.52.102/api/login/';

// Login Thunk
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL, credentials);
        if (response.status === 200) {
            const { access, refresh, role, user_id } = response.data;

            // Store in MMKV
            setItem('access_token', access);
            setItem('refresh_token', refresh);
            setItem('user_role', role);
            setItem('user_id', user_id);

            return { access, refresh, role, user_id };
        } else {
            return rejectWithValue(response.data.message || 'Login failed');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});

// Load user from MMKV (Auto-login)
export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
    try {
        const access = getItem('access_token');
        const refresh = getItem('refresh_token');
        const role = getItem('user_role');
        const user_id = getItem('user_id');

        if (access) {
            return { access, refresh, role, user_id };
        } else {
            return rejectWithValue('No token found');
        }
    } catch (error) {
        return rejectWithValue('Error loading user');
    }
});

// Logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
    removeItem('access_token');
    removeItem('refresh_token');
    removeItem('user_role');
    removeItem('user_id');
    dispatch(authSlice.actions.logout());
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
        role: null,
        userId: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.role = null;
            state.userId = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;
                state.role = action.payload.role;
                state.userId = action.payload.user_id;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;
                state.role = action.payload.role;
                state.userId = action.payload.user_id;
            })
            .addCase(loadUser.rejected, (state) => {
                state.user = null;
            });
    },
});

export default authSlice.reducer;