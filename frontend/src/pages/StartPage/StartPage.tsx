import React from 'react';
import styles from './StartPage.module.scss'
import { MainButton } from '../../components/buttons/MainButton';
import { PageLayout } from '../../shared/PageLayout';

export const StartPage = () => {
  return (
    <PageLayout>
      <div>
        <div>
          <h1 className={styles.header}>
            <span className={styles.highlight}>tsks...</span>
            just tasks
          </h1>
        </div>

        <p className={styles.subtitle}>
          Keep track of the daily tasks in life and get that satisfaction upon completion.
        </p>

        <div className={styles.buttons}>
          <MainButton text={'Get Started'} gradient={true} />

          <MainButton text={'Try Demo'} />
        </div>
      </div>

      <div>
        <img
          className={styles.banner}
          src="../../app/assets/images/banner.png"
          alt="Happy girl"
        />
      </div>
    </PageLayout>
  );
};
