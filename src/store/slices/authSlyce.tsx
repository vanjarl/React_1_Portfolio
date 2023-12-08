import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { StatusOfFetch } from './itemsSlyce';
import { RootState } from '../store';

type FetchAuthParams = {
  email: string;
  password: string;
};

type FetchedAuthData = {
  _id: string;
  fullName: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  email?: string;
};

interface IAuthSlyce {
  data: null | FetchedAuthData;
  status: StatusOfFetch;
}

export const fetchAuthLogin = createAsyncThunk(
  'auth/fetchLoginStatus',
  async (params: FetchAuthParams) => {
    const { data } = await axios.post<FetchedAuthData>(`/auth/login`, params);
    return data;
  },
);

export const fetchAuthMe = createAsyncThunk('auth/fetchMeStatus', async () => {
  const { data } = await axios.get<FetchedAuthData>(`/auth/me`);
  return data;
});

const initialState: IAuthSlyce = {
  data: null,
  status: StatusOfFetch.LOADING,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthLogin.pending, (state) => {
      state.status = StatusOfFetch.LOADING;
      state.data = null;
    });
    builder.addCase(fetchAuthLogin.fulfilled, (state, action) => {
      state.data = action.payload;

      state.status = StatusOfFetch.SUCCESS;
    });
    builder.addCase(fetchAuthLogin.rejected, (state) => {
      state.data = null;
      state.status = StatusOfFetch.ERROR;
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = StatusOfFetch.LOADING;
      state.data = null;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;

      state.status = StatusOfFetch.SUCCESS;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.status = StatusOfFetch.ERROR;
    });
  },
});

export const { logout } = authSlice.actions;
export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export default authSlice.reducer;
