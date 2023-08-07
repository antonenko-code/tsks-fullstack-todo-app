import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { StartPage } from './StartPage';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/*">
        <Route index element={<StartPage />} />
      </Route>
    </Routes>
  )
}
