import React from 'react';
import styles from './Calendar.module.scss';
import { Icons } from '../Icons/Icons';

export const Calendar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.monthWrapper}>
          <span className={styles.month}></span>
          <button className={styles.buttonArrow}><Icons name={'arrowLeft'} /></button>
          <button className={styles.buttonArrow}><Icons name={'arrowRight'} /></button>
        </div>
        <button
          className={styles.button}
          // onClick={}
        >
          All
        </button>
      </div>
      <div className={styles.calendarWrapper}>

      </div>
    </div>
  );
};
