import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchPostComments = createAsyncThunk(
  "/comment/fetchPostComments",
  async (id) => {
    const { data } = await axios.get(`/comment/${id}`);
    return data;
  }
);
export const fetchComments = createAsyncThunk(
  "/comment/fetchComments",
  async (id) => {
    const { data } = await axios.get("/comment");
    return data;
  }
);

const initialState = {
  data: [],
  status: "loading",
};

const commentsSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPostComments.pending]: (state, action) => {
      state.data = [];
      state.status = "loading";
    },
    [fetchPostComments.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchPostComments.rejected]: (state) => {
      state.data = [];
      state.status = "error";
    },
    [fetchComments.pending]: (state, action) => {
      state.data = [];
      state.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchComments.rejected]: (state) => {
      state.data = [];
      state.status = "error";
    },
  },
});

export const commentReducer = commentsSlice.reducer;
