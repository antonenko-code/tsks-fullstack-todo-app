import React from 'react';
import styles from './Profile.module.scss';
import avatar from  '../../app/assets/images/avatar.png';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)

  return (
    <Link to={'/account'}>
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <img src={avatar} alt="avatar"/>
        </div>
        <span className={styles.fullName}>{`${user.firstName} ${user.secondName}`}</span>
      </div>
    </Link>
  );
};
