import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { FormLayout } from '../../shared/FormLayout';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { FormCheckbox } from '../../shared/FormCheckbox';
import styles from './Registration.module.scss';
import { Icons } from '../../shared/Icons/Icons';
import { useForm, InputNames } from '../../utils/useForm';
import { AuthService } from '../../services/AuthService';
import { AxiosError } from 'axios';
import { IBaseResponse } from '../../types/response/IBaseResponse';

const initialData = {
  firstName: '',
  secondName: '',
  password: '',
  email: '',
};

export const Registration: React.FC = () => {
  const [data, setData] = useState(initialData);

  const {
    firstName,
    secondName,
    password,
    email,
  } = data;

  const [isOpenEye, setIsOpenEye] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const {onChange, errors} = useForm();
  const [isCheckedAgree, setIsCheckedAgree] = useState<boolean>(false);
  const [error, setError] = useState<IBaseResponse<any, any> | null>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData((prevState) => ({
        ...prevState,
        [name]: value,
      })
    )
    setError(null);
    onChange(event);
    setIsSubmit(false);
  };

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmit(true);

    if (errors.size === 0 && isCheckedAgree) {
      try {
        const res = await AuthService.registration(data)

        if (res.data.success) {
          await AuthService.login(data.email, data.password)
        }

        setData(initialData);
      } catch (e) {
        const error = e as AxiosError

        if (error.response?.data) {
          setError(error.response.data as IBaseResponse<any, any>)
        }
      }
    }
  };

  const handleShowPassword = (isFirst: boolean) => {
    if (isFirst) {
      setIsOpenEye(prevState => !prevState)
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
          autoComplete={'off'}
          className={styles.form}
          noValidate
          onSubmit={handleOnSubmit}
        >
          <FormField
            title={'First name'}
            name={'firstName'}
            value={firstName}
            placeholder={'First name'}
            onChange={handleOnChange}
          />

          {errors.has(InputNames.FirstName) && isSubmit && (
            <div>{errors.get(InputNames.FirstName)}</div>
          )}

          <FormField
            title={'Second name'}
            name={'secondName'}
            value={secondName}
            placeholder={'Second name'}
            onChange={handleOnChange}
          />

          {errors.has(InputNames.SecondName) && isSubmit && (
            <div>{errors.get(InputNames.SecondName)}</div>
          )}

          <FormField
            title={'Email'}
            name={'email'}
            type={'email'}
            value={email}
            placeholder={'username@gmail.com'}
            onChange={handleOnChange}
          />

          {errors.has(InputNames.Email) && isSubmit && (
            <div>{errors.get(InputNames.Email)}</div>
          )}

          <FormField
            title={'Password'}
            name={'password'}
            type={isOpenEye ? 'text' : 'password'}
            value={password}
            placeholder={'Password'}
            onChange={handleOnChange}
          >
            <div
              onClick={() => handleShowPassword(true)}
            >
              <Icons name={isOpenEye ? 'eyeOpen' : 'eyeClose'} />
            </div>
          </FormField>

          {errors.has(InputNames.Password) && isSubmit && (
            <div>{errors.get(InputNames.Password)}</div>
          )}

          <div className={styles.checkboxWrapper}>
            <FormCheckbox
              description={'I Agree to Privacy Policy'}
              isChecked={isCheckedAgree}
              setIsChecked={setIsCheckedAgree}
            />
          </div>

          {error && !error.success&& (
            <div>{error.message}</div>
          )}

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
