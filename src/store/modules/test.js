import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const counterSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default counterSlice.reducer;
