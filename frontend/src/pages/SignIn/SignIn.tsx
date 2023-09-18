import React, { FormEvent, useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { FormLayout } from '../../shared/FormLayout';
import { FormField } from '../../shared/FormField';
import { Icons } from '../../shared/Icons/Icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss'
import { MainButton } from '../../shared/MainButton';
import { SocialButton } from '../../shared/SocialButton';
import { UseHandlingErrors, InputNames } from '../../utils/UseHandlingErrors';
import { IBaseResponse } from '../../types/response/IBaseResponse';
import { IValidationError } from '../../types/response/IValidationError';
import { AuthService } from '../../services/AuthService';
import { UserService } from '../../services/UserService';
import { setIsAuth, setUser } from '../../features/Auth/reducers/authSlice';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../app/hooks';
import { Loader } from '../../shared/Loader';

const initialData = {
  email: '',
  password: '',
};

export const SignIn: React.FC = () => {
  const [data, setData] = useState(initialData);
  const { password, email } = data;

  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IBaseResponse<any> | null>(null);
  const {onChangeValidation, errors, onSubmitValidation} = UseHandlingErrors();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setError(null);
    onChangeValidation(event);
    setIsSubmit(false);
    setData((prevState) => ({
        ...prevState,
        [name]: value.trim(),
      })
    );
  };

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmit(true);
    const validationErrors = onSubmitValidation(data, [InputNames.Email ,InputNames.Password]);

    if (validationErrors.size === 0) {
      setIsLoading(true);

      try {
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
              className={styles.iconWrapper}
              onClick={() => setIsOpenEye(prevState => !prevState)}
            >
              <Icons name={isOpenEye ? 'eyeOpen' : 'eyeClose'} />
            </div>
          </FormField>
          {errors.has(InputNames.Password) && isSubmit && (
            <div className={styles.errorMessage}>{errors.get(InputNames.Password)}</div>
          )}

          {error && !error.success && (
            <div className={styles.errorMessage}>{error.message}</div>
          )}

          <Link to={'../forgot-password'} className={styles.link}>
            Forgot Password?
          </Link>
          <MainButton
            name={'Sign in'}
            gradient={true}
            fullwidth={true}
            type={'submit'}
          >
            {isLoading && <Loader/>}
          </MainButton>
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
