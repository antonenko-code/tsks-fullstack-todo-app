import React, { FormEvent, useState } from 'react';
import { PageTitle } from '../../shared/PageTitle';
import { PageLayout } from '../../shared/PageLayout';
import { FormLayout } from '../../shared/FormLayout';
import styles from './ForgotPassword.module.scss';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { useForm, InputNames } from '../../utils/useForm';

export const ForgotPassword: React.FC = () => {
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
      <PageTitle title={'Forgot Password?'} />
      <FormLayout>
        <form
          className={styles.form}
          onSubmit={handleOnSubmit}
          noValidate
        >
          <div className={styles.description}>
            Enter your email address below for password reset instructions.
          </div>
          <FormField
            title={'Email'}
            name={'Email'}
            type={'email'}
            value={values.get(InputNames.Email)}
            placeholder={'username@gmail.com'}
            onChange={handleOnChange}
          />
          {errors.has(InputNames.Email) && isSubmit && (
            <div>{errors.get(InputNames.Email)}</div>
          )}
          <MainButton
            name={'Submit'}
            gradient={true}
            fullwidth={true}
            type={'submit'}
          />
        </form>
      </FormLayout>
    </PageLayout>
  );
};
