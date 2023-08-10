import React from 'react';
import styles from './Registration.module.scss';
import { PageLayout } from '../../shared/PageLayout';

export const Registration: React.FC = () => {
  return (
    <PageLayout>
      <div className={styles.block}>
        <h2>
          Registration
        </h2>
      </div>
    </PageLayout>
  );
};
