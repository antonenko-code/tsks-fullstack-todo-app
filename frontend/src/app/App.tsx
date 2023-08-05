import React from 'react';
import './assets/styles/index.scss';
import { Routing } from '../pages';

export const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Routing />
      </div>
    </div>
  )
}

