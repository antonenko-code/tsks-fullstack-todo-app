import React, { FC, ReactNode } from 'react';
import styles from './FormField.module.scss'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  children?: ReactNode;
}

export const FormField: FC<Props> = ({children, ...props}) => {

  return (
      <label
        className={styles.block}
      >
        {props.title}
        <div
          className={styles.inputWrapper}
        >
          <input
            className={styles.input}
            {...props}
          >
          </input>
          {children}
        </div>
      </label>
  );
};
