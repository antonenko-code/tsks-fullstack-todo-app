import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from './SignIn';
import { ForgotPassword } from './ForgotPassword';
import { PasswordReset } from './PasswordReset';
import { Registration } from './Registration';
import { Account } from './Account';
import { Collections } from './Collections';
import { StartPage } from './StartPage';

export const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<StartPage />} />

      <Route path='sign-in' element={<SignIn />} />

      <Route path='forgot-password' element={<ForgotPassword />} />

      <Route path='password-reset' element={<PasswordReset />} />

      <Route path='sign-up' element={<Registration />} />

      <Route path='account' element={<Account />} />

      <Route
        path='collections'
        element={<Collections />}
      >
        <Route
          index
          element={<Collections />}
        />
      </Route>
    </Routes>
  )
}
