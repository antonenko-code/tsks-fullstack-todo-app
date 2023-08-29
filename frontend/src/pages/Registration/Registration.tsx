import React, { FormEvent, useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { FormLayout } from '../../shared/FormLayout';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { FormCheckbox } from '../../shared/FormCheckbox';
import styles from './Registration.module.scss';
import { Icons } from '../../shared/Icons/Icons';
import { useForm, InputNames } from '../../utils/useForm';

export const Registration: React.FC = () => {
  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isSecondOpenEye, setIsSecondOpenEye] = useState(false);
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

  const handleShowPassword = (isFirst: boolean) => {
    if (isFirst) {
      setIsOpenEye(prevState => !prevState)
    } else {
      setIsSecondOpenEye(prevState => !prevState)
    }
  }

  return (
    <PageLayout>
      <PageTitle title={'Registration'} />

      <FormLayout>
        <p>
          Keep track of the daily tasks in life and get that satisfaction upon completion.
        </p>

        <form
          className={styles.form}
          noValidate
          onSubmit={handleOnSubmit}
        >
          <FormField
            title={'First name'}
            name={InputNames.FirstName}
            value={values.get(InputNames.FirstName)}
            placeholder={'First name'}
            onChange={handleOnChange}
          />
          {errors.has(InputNames.FirstName) && isSubmit && (
            <div>{errors.get(InputNames.FirstName)}</div>
          )}

          <FormField
            title={'Second name'}
            name={InputNames.SecondName}
            value={values.get(InputNames.SecondName)}
            placeholder={'Second name'}
            onChange={handleOnChange}
          />
          {errors.has(InputNames.SecondName) && isSubmit && (
            <div>{errors.get(InputNames.SecondName)}</div>
          )}

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
              onClick={() => handleShowPassword(true)}
            >
              <Icons name={isOpenEye ? 'eyeOpen' : 'eyeClose'} />
            </div>
          </FormField>
          {errors.has(InputNames.Password) && isSubmit && (
            <div>{errors.get(InputNames.Password)}</div>
          )}

          <FormField
            title={'Repeat password'}
            name={InputNames.RepeatPassword}
            type={isSecondOpenEye ? 'text' : 'password'}
            value={values.get(InputNames.RepeatPassword)}
            placeholder={'Repeat password'}
            onChange={handleOnChange}
          >
            <div
              className={styles.iconWrapper}
              onClick={() => handleShowPassword(false)}
            >
              <Icons name={isSecondOpenEye ? 'eyeOpen' : 'eyeClose'} />
            </div>
          </FormField>
          {errors.has(InputNames.RepeatPassword) && isSubmit && (
            <div>{errors.get(InputNames.RepeatPassword)}</div>
          )}

          <FormCheckbox description={'I Agree to Privacy Policy'} />

          <MainButton
            name={'Sign up'}
            gradient={true}
            fullwidth={true}
            type={'submit'}
          />
        </form>
      </FormLayout>
    </PageLayout>
  );
};
