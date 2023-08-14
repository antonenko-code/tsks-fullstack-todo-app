import React, { useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { FormLayout } from '../../shared/FormLayout';
import { FormField } from '../../shared/FormField';
import { Icons } from '../../shared/Icons/Icons';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.scss'
import { MainButton } from '../../components/buttons/MainButton';
import { SocialButton } from '../../shared/SocialButton';

export const SignIn: React.FC = () => {
  const [isOpenEye, setIsOpenEye] = useState(false)
  return (
    <PageLayout>
      <PageTitle title={'Sign in'} />
      <FormLayout>
        <form
          className={styles.form}
          // onSubmit={}
        >
          <FormField
            title={'Email'}
            type={'email'}
            placeholder={'username@gmail.com'}
            required
            // onChange={}
          />
          <FormField
            title={'Password'}
            type={isOpenEye ? 'text' : 'password'}
            placeholder={'Password'}
            required
            // onChange={}
          >
            <div
              className={styles.iconWrapper}
              onClick={() => setIsOpenEye(prevState => !prevState)}
            >
              <Icons name={isOpenEye ? 'eyeOpen' : 'eyeClose'} />
            </div>
          </FormField>
          <Link to={'../forgot-password'} className={styles.link}>
            Forgot Password?
          </Link>
        </form>
        <MainButton text={'Sign in'} gradient={true} fullwidth={true} />
        <div className={styles.socialButtonsContainer}>
          <span className={styles.span}>or continue with</span>
          <div className={styles.socialButtonsWrapper}>
            <SocialButton name={'google'} />
            <SocialButton name={'github'} />
            <SocialButton name={'facebook'} />
          </div>
        </div>
        <div className={styles.registrationBlock}>
          <span>Don’t have an account yet?</span>
          <Link to={'../sign-up'} className={styles.link}>
            Sign up
          </Link>
        </div>

      </FormLayout>
    </PageLayout>
  );
};
