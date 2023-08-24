import React, { ReactNode } from 'react';
import styles from './FormLayout.module.scss'
import classNames from 'classnames';

type Props = {
  children?:ReactNode,
  fullWidth?: boolean,
};
export const FormLayout: React.FC<Props> = ({
  children,
  fullWidth,
}) => {
  return (
    <div className={classNames(styles.block, {
      [styles.fullWidth]: fullWidth,
    })}>
      {children}
    </div>
  );
};
