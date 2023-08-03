import React from 'react';
import styles from './StartPage.module.scss'
import { MainButton } from '../../components/buttons/MainButton';
import { RegistrationBtn } from '../../components/buttons/RegButton/RegistrationBtn';

export const StartPage = () => {
  return (
    <>
      <div className={styles.block}>
        Hello, I'm Start Page
      </div>
      <MainButton text={'Get Started'} gradient={true}/>
      <MainButton text={'Try Demo'} fullwidth={true} />
      <RegistrationBtn text={'Sing in'} />
      <RegistrationBtn text={'Sing up'} border={true}/>
    </>
  );
};
