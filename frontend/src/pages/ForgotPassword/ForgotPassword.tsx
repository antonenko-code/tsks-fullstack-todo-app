import React from 'react';
import { PageTitle } from '../../shared/PageTitle';
import { PageLayout } from '../../shared/PageLayout';
import { FormLayout } from '../../shared/FormLayout';
import styles from './ForgotPassword.module.scss';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../components/buttons/MainButton';

export const ForgotPassword: React.FC = () => {
  return (
    <PageLayout>
      <PageTitle title={'Forgot Password?'} />
      <FormLayout>
        <form
          className={styles.form}
          // onSubmit={}
        >
          <div className={styles.description}>
            Enter your email address below for password reset instructions.
          </div>
          <FormField
            title={'Email'}
            type={'email'}
            placeholder={'username@gmail.com'}
            required
            // onChange={}
          />
          <MainButton text={'Submit'} gradient={true} fullwidth={true} />
        </form>
      </FormLayout>
    </PageLayout>
  );
};
