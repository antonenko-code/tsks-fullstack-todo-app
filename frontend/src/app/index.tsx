import React from 'react';
import './assets/styles/index.scss';
import { Providers } from './providers';
import { Routing } from '../pages';

export const App = () => {
  return (
    <div className="App">
      <Routing />
    </div>
  )
}

export default Providers(App)
