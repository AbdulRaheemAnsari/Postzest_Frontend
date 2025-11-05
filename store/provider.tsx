"use client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import createPostModalReducer from "./slices/createPostModalSlice";
import socialConnectModalReducer from "./slices/socialConnectModalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    postModal: createPostModalReducer,
    socialConnectModal: socialConnectModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
