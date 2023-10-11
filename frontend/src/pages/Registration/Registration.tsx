import React, { FormEvent, useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { FormLayout } from '../../shared/FormLayout';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { FormCheckbox } from '../../shared/FormCheckbox';
import styles from './Registration.module.scss';
import { Icons } from '../../shared/Icons/Icons';
import { UseHandlingErrors, InputNames } from '../../utils/UseHandlingErrors';
import { useAppDispatch } from '../../app/hooks';
import { setIsAuth, setUser } from '../../features/Auth/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import { UserService } from '../../services/UserService';
import { AxiosError } from 'axios';
import { IBaseResponse } from '../../types/response/IBaseResponse';
import { IValidationError } from '../../types/response/IValidationError';
import { Loader } from '../../shared/Loader';

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

  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isSecondOpenEye, setIsSecondOpenEye] = useState(false);
  const [secondaryPassword, setSecondaryPassword] = useState({
    repeatPassword: '',
    errorMessage: false,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const {onChangeValidation, errors, onSubmitValidation} = UseHandlingErrors();
  const [isCheckedAgree, setIsCheckedAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IBaseResponse<IValidationError> | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError(null);

    if (name === InputNames.RepeatPassword) {
      setSecondaryPassword({ errorMessage: false, repeatPassword: value });
    } else {
      setData((prevState) => ({
          ...prevState,
          [name]: value.trim(),
        })
      );
    }

    onChangeValidation(event);
    setIsSubmit(false);
    setSecondaryPassword(prevState => ({ ...prevState, errorMessage: false}));
  };

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsSubmit(true);
    const validationErrors = onSubmitValidation(data, [InputNames.FirstName, InputNames.SecondName, InputNames.Email ,InputNames.Password]);

    if (data.password !== secondaryPassword.repeatPassword) {
      setSecondaryPassword(prevState => ({ ...prevState, errorMessage: true}));
    }

    if (validationErrors.size === 0 && isCheckedAgree) {
      setIsLoading(true);

      try {
        await AuthService.registration(data);
        const response = await AuthService.login({ email, password });
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        const user = await UserService.getUser();
        dispatch(setUser(user.data))
        dispatch(setIsAuth(true));
        navigate('/');
      } catch (e) {
        const error = e as AxiosError
        setError(error.response?.data as IBaseResponse<IValidationError>)
      } finally {
        setIsLoading(false);
      }
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
            value={firstName}
            placeholder={'First name'}
            onChange={handleOnChange}
          />
          {errors.has(InputNames.FirstName) && isSubmit && (
            <div className={styles.errorMessage}>{errors.get(InputNames.FirstName)}</div>
          )}

          <FormField
            title={'Second name'}
            name={InputNames.SecondName}
            value={secondName}
            placeholder={'Second name'}
            onChange={handleOnChange}
          />
          {errors.has(InputNames.SecondName) && isSubmit && (
            <div className={styles.errorMessage}>{errors.get(InputNames.SecondName)}</div>
          )}

          <FormField
            title={'Email'}
            name={InputNames.Email}
            type={'email'}
            value={email}
            placeholder={'username@gmail.com'}
            onChange={handleOnChange}
          />
          {errors.has(InputNames.Email) && isSubmit && (
            <div className={styles.errorMessage}>{errors.get(InputNames.Email)}</div>
          )}

          <FormField
            title={'Password'}
            name={InputNames.Password}
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
            <div className={styles.errorMessage}>{errors.get(InputNames.Password)}</div>
          )}

          <FormField
            title={'Repeat password'}
            name={InputNames.RepeatPassword}
            type={isSecondOpenEye ? 'text' : 'password'}
            value={secondaryPassword.repeatPassword}
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
          {isSubmit && secondaryPassword.errorMessage && (
            <span className={styles.errorMessage}>Passwords should be same</span>
          )}

          <div className={styles.checkboxWrapper}>
            <FormCheckbox
              description={'I Agree to Privacy Policy'}
              handleChangeStatus={setIsCheckedAgree}
              checked={isCheckedAgree}
            />
            {isSubmit && !isCheckedAgree && (
              <span className={styles.errorMessage}>Policies should be accepted</span>
            )}

          </div>

          {error && !error.success && (
            <div className={styles.errorMessage}>{error.message}</div>
          )}

          <MainButton
            name={isLoading? '...Loading' : 'Sign up'}
            gradient={true}
            fullwidth={true}
            type={'submit'}
          >
            {isLoading && <Loader/>}
          </MainButton>
        </form>
      </FormLayout>
    </PageLayout>
  );
};
