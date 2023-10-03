import React, { useEffect } from 'react';
import './assets/styles/index.scss';
import { Routing } from '../pages';
import { Header } from '../widgets/header';
import { Footer } from '../widgets/footer';
import { UserService } from '../services/UserService';
import { setIsAuth, setUser } from '../features/Auth/reducers/authSlice';
import { useAppDispatch } from './hooks';
import { IUser } from '../types/IUser';

export const App = () => {
  const dispatch = useAppDispatch();
  const getUser = async () => {
    try {
      const response = await UserService.getUser();
      dispatch(setUser(response.data))
      dispatch(setIsAuth(true));
    } catch (error) {
      dispatch(setIsAuth(false));
      dispatch(setUser({} as IUser));
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Routing />
        <Footer />
      </div>
    </div>
  )
}
