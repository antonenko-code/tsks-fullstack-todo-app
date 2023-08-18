import React from 'react';
import styles from './StartPage.module.scss'
import { MainButton } from '../../components/buttons/MainButton';
import { PageLayout } from '../../shared/PageLayout';
import banner from '../../app/assets/images/banner.png';

export const StartPage = () => {
  return (
    <PageLayout>
      <div className={styles.block}>
        <div>
          <div>
            <h1 className={styles.header}>
              <span className={styles.highlight}>tsks...</span><br/>
              just tasks
            </h1>
          </div>

          <p className={styles.subtitle}>
            Keep track of the daily tasks in life and get that satisfaction upon completion.
          </p>

          <div className={styles.buttons}>
            <MainButton name={'Get Started'} gradient={true} />

            <MainButton name={'Try Demo'} />
          </div>
        </div>

        <div>
          <img
            src={banner}
            alt="Happy girl"
          />
        </div>
      </div>
    </PageLayout>
  );
};
