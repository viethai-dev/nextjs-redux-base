import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null, // Không đọc localStorage ở đây
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            // Simulate API call
            const response = await new Promise<{ user: User; token: string }>((resolve) => {
                setTimeout(() => {
                    resolve({
                        user: {
                            id: '1',
                            email: credentials.email,
                            name: 'John Doe',
                        },
                        token: 'mock-jwt-token',
                    });
                }, 1000);
            });

            // Store token in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', response.token);
            }

            return response;
        } catch (error) {
            return rejectWithValue('Login failed');
        }
    }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            // Clear token from localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
            return null;
        } catch (error) {
            return rejectWithValue('Logout failed');
        }
    }
);

// Async thunk to initialize auth state from localStorage
export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { rejectWithValue }) => {
        try {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                if (token) {
                    // Simulate user data fetch
                    const user = {
                        id: '1',
                        email: 'user@example.com',
                        name: 'John Doe',
                    };
                    return { user, token };
                }
            }
            return null;
        } catch (error) {
            return rejectWithValue('Failed to initialize auth');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Initialize
            .addCase(initializeAuth.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.isAuthenticated = true;
                }
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });
    },
});

export const { clearError, setUser } = authSlice.actions;

export default authSlice.reducer;
