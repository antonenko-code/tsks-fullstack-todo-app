import React from 'react';
import './assets/styles/index.scss';
import { Routing } from '../pages';
import { Header } from '../wigets/header';

export const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Routing />
      </div>
    </div>
  )
}

