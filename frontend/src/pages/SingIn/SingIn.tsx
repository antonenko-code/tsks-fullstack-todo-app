import React from 'react';
import styles from './SingIn.module.scss';
import { PageLayout } from '../../shared/PageLayout';

export const SingIn: React.FC = () => {
  return (
    <PageLayout>
      <div className={styles.block}>
        <h2>
          Sign in
        </h2>
      </div>
    </PageLayout>
  );
};
