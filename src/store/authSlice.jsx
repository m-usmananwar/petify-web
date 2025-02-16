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
  message: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      let response = await apiClient.post("/signin", {
        email,
        password,
      });

      const responseData = response.data;
      const user = responseData.data;
      const token = responseData.data.token;
      const message = responseData.message;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return { user, token, message };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async ({ verificationId, verificationCode }, { rejectWithValue }) => {
    try {
      let response = await apiClient.post("/verify-email", {
        verificationId,
        verificationCode,
      });

      const responseData = response.data;
      const user = responseData.data;
      const token = responseData.data.token;
      const message = responseData.message;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return { user, token, message };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Verification failed. Please try again."
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
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
      return rejectWithValue(
        error.message || "Verification failed. Please try again."
      );
    }
  }
);

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
        state.status = "succeeded";
        state.auth = payload.user;
        state.token = payload.token;
        state.message = payload.message;
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
        state.message = payload.message;
      })
      .addCase(verify.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
