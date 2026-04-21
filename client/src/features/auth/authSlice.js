import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for register
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      // Use empty string locally so it falls back to Vite's proxy, bypassing CORS issues!
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return thunkAPI.rejectWithValue(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      
      // If the backend returns a token, persist it locally for future authenticated requests
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Handle response structure safely: if { user, token } is returned, return just user.
      return data.user ? data.user : data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred during registration');
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload; // Store user data on success
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
