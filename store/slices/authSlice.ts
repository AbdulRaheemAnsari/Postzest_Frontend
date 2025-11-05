import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    setToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
      if (action.payload) {
        localStorage.setItem("accessToken", action.payload);
      } else {
        localStorage.removeItem("accessToken");
      }
    },

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setAuthData, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
