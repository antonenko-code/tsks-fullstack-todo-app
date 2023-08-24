import React, { useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import styles from './Account.module.scss';
import avatar from  '../../app/assets/images/avatar.png';
import { FormLayout } from '../../shared/FormLayout';
import { AccountField } from '../../shared/AccountField';
import { MainButton } from '../../shared/MainButton';
import { Icons } from '../../shared/Icons/Icons';

interface User {
  avatar: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isSubscribed: boolean,
}

const user = {
  avatar: '/',
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: '42234ffw$',
  isSubscribed: false,
};


export const Account: React.FC = () => {
  const {
    firstName,
    lastName,
    email,
    password,
    isSubscribed,
  } = user;

  const name = `${firstName} ${lastName}`;
  const [editName, setEditName] = useState<boolean>(false);

  return (
    <PageLayout>
      <PageTitle title={'My Account'} button={true} />

      <div className={styles.userWrapper}>
        <div className={styles.avatarWrapper}>
          <img src={avatar} alt="avatar"/>

          <div className={styles.chooseAvatar}>
            <Icons name={'pencil'} />
          </div>
        </div>

        <div className={styles.user}>
          <span className={styles.name}>
            {name}
          </span>

          <div className={styles.statusWrapper}>
            <div className={styles.subscribeStatus}>
              {!isSubscribed ? (
                'free'
              ) : (
                'subscribed'
              )}
            </div>
          </div>
        </div>
      </div>

      <FormLayout fullWidth={true}>
        <AccountField
          titleField={'Display Name'}
          inputValue={name}
          btnName={'Edit'}
        />

        <AccountField
          titleField={'Email'}
          inputValue={email}
          btnName={'Edit'}
        />

        <AccountField
          titleField={'Password'}
          inputValue={password}
          btnName={'Change'}
          hiddenInput={true}
        />
      </FormLayout>

      <FormLayout fullWidth={true}>
        <AccountField
          titleField={'Subscription'}
          inputValue={
            `${!isSubscribed ? (
              'Tsks Free'
            ) : (
              'Paid'
            )}`
          }
          btnName={'Upgrade to Pro'}
          gradient={true}
        />
      </FormLayout>

      <div>
        <MainButton name={'Sign out'} />
      </div>
    </PageLayout>
  );
};
