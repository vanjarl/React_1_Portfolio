import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export enum StatusOfPostFetch {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

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
  status: StatusOfPostFetch;
}

export const fetchPosts = createAsyncThunk(
  'postsFromBack/fetchByStatus',
  async (params: FetchPostParams) => {
    console.log(params);
    const { currentPage, limit } = params;
    // console.log(currentPage, limit);
    const { data } = await axios.get<FetchedPosts>(`/posts?page=${currentPage}&limit=${limit}`);
    return data;
  },
);

const initialState: IPostSlyce = {
  posts: [],
  tags: [],
  amount: 0,
  status: StatusOfPostFetch.LOADING,
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
      state.status = StatusOfPostFetch.LOADING;
      state.posts = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.tags = action.payload.posts.map((post: Post) => post.tags).flat();
      state.amount = action.payload.amount;
      state.status = StatusOfPostFetch.SUCCESS;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts = [];
      state.status = StatusOfPostFetch.ERROR;
    });
  },
});

export default postsSlice.reducer;
