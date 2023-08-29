import React, { FormEvent, useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { FormLayout } from '../../shared/FormLayout';
import { FormField } from '../../shared/FormField';
import { Icons } from '../../shared/Icons/Icons';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.scss'
import { MainButton } from '../../shared/MainButton';
import { SocialButton } from '../../shared/SocialButton';
import { useForm, InputNames } from '../../utils/useForm';

export const SignIn: React.FC = () => {
  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const {onChange, values, errors} = useForm();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setIsSubmit(false);
  };

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsSubmit(true);

    if (errors.size === 0) {
      // TODO: Create Object for sending request to back-end
    }
  };
  return (
    <PageLayout>
      <PageTitle title={'Sign in'} />
      <FormLayout>
        <form
          className={styles.form}
          onSubmit={handleOnSubmit}
          noValidate
        >
          <FormField
            title={'Email'}
            name={InputNames.Email}
            type={'email'}
            value={values.get(InputNames.Email)}
            placeholder={'username@gmail.com'}
            onChange={handleOnChange}
          />
          {errors.has(InputNames.Email) && isSubmit && (
            <div>{errors.get(InputNames.Email)}</div>
          )}
          <FormField
            title={'Password'}
            name={InputNames.Password}
            type={isOpenEye ? 'text' : 'password'}
            value={values.get(InputNames.Password)}
            placeholder={'Password'}
            onChange={handleOnChange}
          >
            <div
              className={styles.iconWrapper}
              onClick={() => setIsOpenEye(prevState => !prevState)}
            >
              <Icons name={isOpenEye ? 'eyeOpen' : 'eyeClose'} />
            </div>
          </FormField>
          {errors.has(InputNames.Password) && isSubmit && (
            <div>{errors.get(InputNames.Password)}</div>
          )}
          <Link to={'../forgot-password'} className={styles.link}>
            Forgot Password?
          </Link>
          <MainButton name={'Sign in'} gradient={true} fullwidth={true} type={'submit'}/>
        </form>
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
