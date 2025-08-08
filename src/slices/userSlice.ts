import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    preferences: {
        theme: 'light' | 'dark';
        language: string;
        notifications: boolean;
    };
}

interface UserState {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    loading: false,
    error: null,
};

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
    'user/fetchProfile',
    async (userId: string, { rejectWithValue }) => {
        try {
            // Simulate API call
            const response = await new Promise<UserProfile>((resolve) => {
                setTimeout(() => {
                    resolve({
                        id: userId,
                        name: 'John Doe',
                        email: 'john@example.com',
                        avatar: 'https://via.placeholder.com/150',
                        bio: 'Software Developer',
                        preferences: {
                            theme: 'light',
                            language: 'en',
                            notifications: true,
                        },
                    });
                }, 1000);
            });

            return response;
        } catch (error) {
            return rejectWithValue('Failed to fetch user profile');
        }
    }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async (profileData: Partial<UserProfile>, { rejectWithValue }) => {
        try {
            // Simulate API call
            const response = await new Promise<UserProfile>((resolve) => {
                setTimeout(() => {
                    resolve({
                        id: '1',
                        name: profileData.name || 'John Doe',
                        email: profileData.email || 'john@example.com',
                        avatar: profileData.avatar,
                        bio: profileData.bio,
                        preferences: {
                            theme: 'light',
                            language: 'en',
                            notifications: true,
                            ...profileData.preferences,
                        },
                    });
                }, 1000);
            });

            return response;
        } catch (error) {
            return rejectWithValue('Failed to update user profile');
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
        updateTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            if (state.profile) {
                state.profile.preferences.theme = action.payload;
            }
        },
        toggleNotifications: (state) => {
            if (state.profile) {
                state.profile.preferences.notifications = !state.profile.preferences.notifications;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUserError, updateTheme, toggleNotifications } = userSlice.actions;

export default userSlice.reducer;
