import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { StatusOfFetch } from './itemsSlyce';
import { RootState } from '../store';

export type FetchAuthParams = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type FetchRegisterParams = {
  email: string;
  password: string;
  fullName: string;
  avatarUrl?: string;
};

export type FetchedAuthData = {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};

// interface IAuthSlyce {
//   data: null | FetchedAuthData;
//   status: StatusOfFetch;
// }

interface IAuthSlyce {
  data: null | FetchedAuthData;
  status: StatusOfFetch;
  error: string | null;
}

const initialState: IAuthSlyce = {
  data: null,
  status: StatusOfFetch.LOADING,
  error: null,
};

const handleFetchPending = (state: IAuthSlyce) => {
  state.status = StatusOfFetch.LOADING;
  state.data = null;
};

const handleFetchFulfilled = (state: IAuthSlyce, action: PayloadAction<FetchedAuthData>) => {
  state.data = action.payload;
  state.status = StatusOfFetch.SUCCESS;
};

const handleFetchRejected = (state: IAuthSlyce, action: any) => {
  state.data = null;
  state.status = StatusOfFetch.ERROR;
  state.error = action.error?.message || 'Непередбачена помилка';
};

export const fetchAuthLogin = createAsyncThunk(
  'auth/fetchLoginStatus',
  async (params: FetchAuthParams) => {
    const { data } = await axios.post<FetchedAuthData>('/auth/login', params);
    return data;
  },
);

export const fetchAuthMe = createAsyncThunk('auth/fetchMeStatus', async () => {
  const { data } = await axios.get<FetchedAuthData>('/auth/me');
  return data;
});

export const fetchRegister = createAsyncThunk(
  'auth/registerStatus',
  async (params: FetchRegisterParams) => {
    const { data } = await axios.post<FetchedAuthData>('/auth/register', params);
    return data;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthLogin.pending, handleFetchPending);
    builder.addCase(fetchAuthLogin.fulfilled, handleFetchFulfilled);
    builder.addCase(fetchAuthLogin.rejected, handleFetchRejected);
    builder.addCase(fetchAuthMe.pending, handleFetchPending);
    builder.addCase(fetchAuthMe.fulfilled, handleFetchFulfilled);
    builder.addCase(fetchAuthMe.rejected, handleFetchRejected);
    builder.addCase(fetchRegister.pending, handleFetchPending);
    builder.addCase(fetchRegister.fulfilled, handleFetchFulfilled);
    builder.addCase(fetchRegister.rejected, handleFetchRejected);
  },
});

export const { logout } = authSlice.actions;
export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export default authSlice.reducer;
