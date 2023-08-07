import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss'
import { HeaderButton } from '../../components/buttons/HeaderButton';
import { Icons } from '../../shared/Icons/Icons';

export const Header: FC = () => {
  return (
    <div>
      <header className={styles.header}>
        <Link
          className={styles.logoText}
          to="/"
        >
          <div className={styles.logoBlock}>
            <div className={styles.logoIcon}>
              <Icons name={'checked'} />
            </div>

            <span>
              tsks
            </span>
          </div>
        </Link>

        <div className={styles.blockButtons}>
          <Link to='/sing-in' className={styles.button}>
            <HeaderButton text="Sing In" />
          </Link>

          <Link to='sing-up'>
            <HeaderButton text="Sing Up" border={true} />
          </Link>
        </div>
      </header>
    </div>
  );
};
