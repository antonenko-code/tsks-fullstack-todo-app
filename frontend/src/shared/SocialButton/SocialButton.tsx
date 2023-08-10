import React from 'react';
import styles from './SocialButton.module.scss';
import { Icons } from '../Icons/Icons';

type Props = {
  name: string,
};
export const SocialButton: React.FC<Props> = ({ name }) => {
  return (
    <div className={styles.block}>
      <Icons name={name} />
    </div>
  );
};
