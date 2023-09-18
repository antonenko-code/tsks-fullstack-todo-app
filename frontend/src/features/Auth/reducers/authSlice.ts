import { IUser } from '../../../types/IUser';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserService } from '../../../services/UserService';
import { AuthService } from '../../../services/AuthService';
import { IRequestLoginData } from '../../../types/request/IRequestLoginData';
import { AxiosError } from 'axios';

export interface authState {
  user: IUser,
  isAuth: boolean,
}

const initialState: authState = {
  user: {} as IUser,
  isAuth: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: IRequestLoginData, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(credentials);

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    const user = await UserService.getUser();

    return user.data;
  } catch (e) {
    const error = e as AxiosError

    return rejectWithValue(error.response?.data)
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
