import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePosts = createAsyncThunk(
  "auth/fetchRemovePost",
  async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  }
);
export const fetchSortedPosts = createAsyncThunk(
  "posts/fetchSortedPosts",
  async (orderBy) => {
    const { data } = await axios.get(`/sort/${orderBy}`);
    return data;
  }
);
export const fetchPostWithSameTags = createAsyncThunk(
  "tags/fetchPostsTags",
  async (tagName) => {
    const { data } = await axios.get(`/tags/${tagName}`);
    return data;
  }
);
const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    //получение статей
    [fetchPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //сортировка статей
    [fetchSortedPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchSortedPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchSortedPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //получение тегов
    [fetchTags.pending]: (state, action) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    //получение статей с определенными тегами
    [fetchPostWithSameTags.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPostWithSameTags.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostWithSameTags.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //удаление статей
    [fetchRemovePosts.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
