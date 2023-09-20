import React from 'react';
import { IconButton } from '../../shared/IconButton';
import { Icons } from '../../shared/Icons/Icons';
import { AuthService } from '../../services/AuthService';
import { useAppDispatch } from '../../app/hooks';
import { setIsAuth, setUser } from '../Auth/reducers/authSlice';
import { IUser } from '../../types/IUser';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoutButtonOnClick = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return;
    }

   try {
     const response = await AuthService.logout(refreshToken);
     localStorage.removeItem('accessToken');
     localStorage.removeItem('refreshToken');
     dispatch(setIsAuth(false));
     dispatch(setUser({} as IUser));
     navigate('/sign-in');
   } catch (e) {
      return;
   }
  }

  return (
    <IconButton onClick={handleLogoutButtonOnClick}>
      <Icons name={'logout'} />
    </IconButton>
  );
};
