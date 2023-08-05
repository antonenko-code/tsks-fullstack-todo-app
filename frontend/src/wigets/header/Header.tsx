import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss'
import { HeaderButton } from '../../components/buttons/HeaderButton';

export const Header: FC = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logoBlock}>
          <div className={styles.logoIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
              <g clipPath="url(#clip0_29_687)">
                <path d="M15.4197 3.70547C15.8592 4.14493 15.8592 4.8586 15.4197 5.29805L6.41973 14.2981C5.98027 14.7375 5.2666 14.7375 4.82715 14.2981L0.327148 9.79805C-0.112305 9.3586 -0.112305 8.64493 0.327148 8.20547C0.766602 7.76602 1.48027 7.76602 1.91973 8.20547L5.6252 11.9074L13.8307 3.70547C14.2701 3.26602 14.9838 3.26602 15.4232 3.70547H15.4197Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_29_687">
                  <rect width="15.75" height="18" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>

          <Link className={styles.logoText} to="/">
            tsks
          </Link>
        </div>

        <div>
          <HeaderButton text="Sing In" />
          <HeaderButton text="Sing Up" border={true}/>
        </div>
      </header>
    </div>
  );
};
