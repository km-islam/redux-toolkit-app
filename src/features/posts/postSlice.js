import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./postApi";
const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const postsFetch = createAsyncThunk("posts/postsFetch", async () => {
  const posts = await getPosts();
  return posts;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postsFetch.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(postsFetch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(postsFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    });
  },
});

export default postSlice.reducer;
