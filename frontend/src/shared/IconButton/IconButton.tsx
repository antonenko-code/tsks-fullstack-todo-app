import React, { ReactNode } from 'react';
import styles from './IconButton.module.scss'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
}

export const IconButton: React.FC<Props> = ({children, ...props}) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};
