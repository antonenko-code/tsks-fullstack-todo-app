import React, { FormEvent, useState } from 'react';
import { PageTitle } from '../../shared/PageTitle';
import { PageLayout } from '../../shared/PageLayout';
import { FormLayout } from '../../shared/FormLayout';
import styles from './ForgotPassword.module.scss';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { UserService } from '../../services/UserService';
import { IBaseResponse } from '../../types/response/IBaseResponse';
import { IValidationError } from '../../types/response/IValidationError';
import { AxiosError } from 'axios';
import { Loader } from '../../shared/Loader';
import { InputNames, UseHandlingErrors } from '../../utils/UseHandlingErrors';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<IBaseResponse<IValidationError> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const {onChangeValidation, errors, onSubmitValidation} = UseHandlingErrors();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage('');
    setError(null);
    setEmail(value);
    onChangeValidation(event);
    setIsSubmit(false);
  };

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = onSubmitValidation({email}, [InputNames.Email]);
    setIsSubmit(true);
    setMessage('')
    setError(null);

    if (validationErrors.size === 0) {
      setIsLoading(true);

      try {
        const response = await UserService.forgotPassword(email);
        setMessage(response.data.message);
        setEmail('');
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
            placeholder={'username@gmail.com'}
            name={InputNames.Email}
            value={email}
            onChange={handleOnChange}
          />
          {errors.has(InputNames.Email) && isSubmit && (
            <div className={styles.errorMessage}>{errors.get(InputNames.Email)}</div>
          )}

          {error && !error.success && (
            <div className={styles.errorMessage}>{error.message}</div>
          )}
          {message && (
            <div className={styles.successMessage}>{message}</div>
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
