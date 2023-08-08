import React, { FC, ReactNode } from 'react';
import styles from './PageLayout.module.scss'

type Props = {
  children: ReactNode;
};

export const PageLayout:FC<Props> = ({
 children,
}) => {
  return (
    <div className={styles.PageContainer}>
      {children}
    </div>
  );
};
