import { configureStore } from "@reduxjs/toolkit";
import test from "./modules/test";
import ggg from "./modules/ggg";



export const store = configureStore({
  reducer: {test,ggg},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
  devTools: process.env.NODE_ENV !== "production",
});

