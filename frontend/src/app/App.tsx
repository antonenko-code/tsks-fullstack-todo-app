import React from 'react';
import './assets/styles/index.scss';
import { Routing } from '../pages';
import { Header } from '../wigets/header';
import { Footer } from '../wigets/footer';

export const App = () => {
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
