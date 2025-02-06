import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../helpers/apiClient.jsx";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const tokenFromStorage = localStorage.getItem("token") || null;

const initialState = {
  auth: userFromStorage,
  token: tokenFromStorage,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await apiClient.post("/signin", {
        email,
        password,
      });

      const user = response.data;
      const token = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return { user, token };
    } catch (error) {
      console.log("Error", error);
      return error ? error.message : "Login failed. Please try again.";
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async ({ verificationId, verificationCode }) => {
    try {
      const response = await apiClient.post("/api/verify", {
        verificationId,
        verificationCode,
      });
      const user = response.data;
      const token = user.token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return { user, token };
    } catch (error) {
      return error ? error.message : "Verification failed. Please try again.";
    }
  }
);

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (!token || !user) {
      throw new Error("Not authenticated");
    }
    return { user, token };
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return error.message || "Failed to authenticate";
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.auth = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.auth = payload.user;
        state.token = payload.token;
      })
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
        state.auth = null;
        state.token = null;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        console.log("Inside Slice fulfilled", payload);
        state.status = "succeeded";
        state.auth = payload.user;
        state.token = payload.token;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(verify.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verify.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.auth = payload.user;
        state.token = payload.token;
      })
      .addCase(verify.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
