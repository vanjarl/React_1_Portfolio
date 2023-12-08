import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { StatusOfFetch } from './itemsSlyce';

export type FetchPostParams = {
  currentPage: number;
  limit: number;
};

export type Post = {
  _id: string;
  title: string;
  text: string;
  tags: string;
  viewsCount: number;
  user: string;
};

type FetchedPosts = {
  posts: Post[];
  amount: number;
};

interface IPostSlyce {
  tags: string[];
  posts: Post[];
  amount: number;
  status: StatusOfFetch;
}

export const fetchPosts = createAsyncThunk(
  'postsFromBack/fetchByStatus',
  async (params: FetchPostParams) => {
    const { currentPage, limit } = params;
    const { data } = await axios.get<FetchedPosts>(`/posts?page=${currentPage}&limit=${limit}`);
    return data;
  },
);

const initialState: IPostSlyce = {
  posts: [],
  tags: [],
  amount: 0,
  status: StatusOfFetch.LOADING,
};

export const postsSlice = createSlice({
  name: 'postsFromBack',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.posts = action.payload;
      state.amount = action.payload.amount;
      state.tags = action.payload.posts.map((post: Post) => post.tags).flat();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = StatusOfFetch.LOADING;
      state.posts = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.tags = action.payload.posts.map((post: Post) => post.tags).flat();
      state.amount = action.payload.amount;
      state.status = StatusOfFetch.SUCCESS;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts = [];
      state.status = StatusOfFetch.ERROR;
    });
  },
});

export default postsSlice.reducer;
