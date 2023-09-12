import React, { FormEvent, useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { FormLayout } from '../../shared/FormLayout';
import styles from './PasswordReset.module.scss';
import { Icons } from '../../shared/Icons/Icons';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { UseHandlingErrors, InputNames } from '../../utils/UseHandlingErrors';

export const PasswordReset: React.FC = () => {
  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isSecondOpenEye, setIsSecondOpenEye] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const {onChangeValidation, errors} = UseHandlingErrors();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValidation(event);
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
            // value={}
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
            // value={}
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
          <MainButton
            name={'Apply'}
            gradient={true}
            fullwidth={true}
            type={'submit'}
          />
        </form>
      </FormLayout>
    </PageLayout>
  );
};
