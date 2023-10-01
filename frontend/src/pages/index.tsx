import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SignIn } from './SignIn';
import { ForgotPassword } from './ForgotPassword';
import { PasswordReset } from './PasswordReset';
import { Registration } from './Registration';
import { Account } from './Account';
import { Collections } from './Collections';
import { Home } from './Home';
import { Tasks } from './Tasks';
import { useAppSelector } from '../app/hooks';

export const Routing = () => {
  const { isAuth } = useAppSelector(state => state.auth)
  return (
    <Routes>
      <Route path='/' element={isAuth ? <Navigate to='/collections' /> : <Home />} />

      <Route path='sign-in' element={<SignIn /> } />

      <Route path='forgot-password' element={<ForgotPassword />} />

      <Route path='user/reset-password/:token' element={<PasswordReset />} />

      <Route path='sign-up' element={<Registration />} />

      <Route path='account' element={<Account />} />

      <Route path="collections">
        <Route index element={<Collections />} />
        <Route path=":id" element={<Tasks />} />
      </Route>
    </Routes>
  )
}
