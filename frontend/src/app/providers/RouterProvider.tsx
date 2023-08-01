import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const RouterProvider = (component: () => React.ReactNode) => () => (
  <BrowserRouter>
    {component()}
  </BrowserRouter>
);
