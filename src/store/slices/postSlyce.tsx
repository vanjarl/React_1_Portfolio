import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { StatusOfFetch } from './itemsSlyce';

export type FetchPostParams = {
  currentPage: number;
  limitPosts: number;
  limitComments: number;
  sortBy: string;
  activeTag: string;
};

type User = {
  _id: string;
  fullName: string;
  avatarUrl?: string;
  email: string;
};

export type PostItem = {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: User;
  imageUrl: string;
  comments: Comment[];
  createdAt: string;
};

export type Comment = {
  createdAt: string;
  user: User;
  text: string;
  _id: string;
  post: string;
};

interface FetchedPosts {
  posts: PostItem[];
  amount: number;
  comments: Comment[];
}

interface IPostSlyce {
  tags: string[];
  posts: PostItem[];
  comments: Comment[];
  amount: number;
  status: StatusOfFetch;
}

export const fetchPosts = createAsyncThunk(
  'postsFromBack/fetchPosts',
  async (params: FetchPostParams) => {
    const { currentPage, limitPosts, sortBy, activeTag, limitComments } = params;
    const tag = activeTag ? `&tag=${activeTag}` : '';
    const { data } = await axios.get<FetchedPosts>(
      `/posts?page=${currentPage}&limitPosts=${limitPosts}&limitComments=${limitComments}&sortBy=${sortBy}${tag}`,
    );
    return data;
  },
);

const initialState: IPostSlyce = {
  posts: [],
  tags: [],
  comments: [],
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
      state.tags = action.payload.posts.map((post: PostItem) => post.tags).flat();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = StatusOfFetch.LOADING;
      state.posts = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.tags = action.payload.posts.map((post: PostItem) => post.tags).flat();
      state.amount = action.payload.amount;
      state.comments = action.payload.comments;
      state.status = StatusOfFetch.SUCCESS;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts = [];
      state.status = StatusOfFetch.ERROR;
    });
  },
});

export default postsSlice.reducer;
