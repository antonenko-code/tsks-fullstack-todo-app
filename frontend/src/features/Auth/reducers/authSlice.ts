import { IUser } from '../../../types/IUser';
import { createSlice } from '@reduxjs/toolkit';

export interface authState {
  user: IUser,
  isAuth: boolean,
}

const initialState: authState = {
  user: {} as IUser,
  isAuth: false,
};

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
    updateUser: (state, action) => {
      state.user = {...state.user, ...action.payload}
    },
  },
});

export const {
  setIsAuth,
  setUser,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
