import React, { FormEvent, useState } from 'react';
import styles from './PasswordReset.module.scss';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { FormLayout } from '../../shared/FormLayout';
import { Icons } from '../../shared/Icons/Icons';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { UseHandlingErrors, InputNames } from '../../utils/UseHandlingErrors';
import { UserService } from '../../services/UserService';
import { AxiosError } from 'axios';
import { IBaseResponse } from '../../types/response/IBaseResponse';
import { IValidationError } from '../../types/response/IValidationError';
import { Loader } from '../../shared/Loader';
import { useNavigate, useParams } from 'react-router-dom';

export const PasswordReset: React.FC = () => {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState({
    repeatPassword: '',
    errorMessage: false,
  });
  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isSecondOpenEye, setIsSecondOpenEye] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState<IBaseResponse<IValidationError> | null>(null);
  const {onChangeValidation, errors, onSubmitValidation} = UseHandlingErrors();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === InputNames.RepeatPassword) {
      setRepeatPassword({ errorMessage: false, repeatPassword: value });
    } else {
      setPassword(value);
    }

    onChangeValidation(event);
    setIsSubmit(false);
    setRepeatPassword(prevState => ({ ...prevState, errorMessage: false}));

  };

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = onSubmitValidation({password, repeatPassword: repeatPassword.repeatPassword}, [InputNames.Password, InputNames.RepeatPassword]);
    setIsSubmit(true);

    if (password && password !== repeatPassword.repeatPassword) {
      setRepeatPassword(prevState => ({ ...prevState, errorMessage: true}));
    }

    if (validationErrors.size === 0 && token) {
      setIsLoading(true);

      try {
        await UserService.resetPassword(password, token);
        navigate('/sign-in')
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
      <PageTitle title={'Password Reset'}/>

      <FormLayout>
        <span className={styles.span}>Create a new password</span>

        <form
          className={styles.form}
          noValidate
          onSubmit={handleOnSubmit}
        >
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
            value={repeatPassword.repeatPassword}
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
          {isSubmit && repeatPassword.errorMessage && (
            <div className={styles.errorMessage}>Passwords should be same</div>
          )}
          {errors.has(InputNames.RepeatPassword) && isSubmit && (
            <div className={styles.errorMessage}>{errors.get(InputNames.RepeatPassword)}</div>
          )}
          {error && !error.success && (
            <div className={styles.errorMessage}>{error.message}</div>
          )}
          <MainButton
            name={'Submit'}
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
