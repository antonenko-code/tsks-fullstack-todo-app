import React, { ReactNode } from 'react';
import styles from './FormLayout.module.scss'

type Props = {
  children: ReactNode,
};
export const FormLayout: React.FC<Props> = ({
  children,
}) => {
  return (
    <div className={styles.block}>
      {children}
    </div>
  );
};
