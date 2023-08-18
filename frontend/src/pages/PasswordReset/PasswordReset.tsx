import React, { useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { FormLayout } from '../../shared/FormLayout';
import styles from './PasswordReset.module.scss';
import { Icons } from '../../shared/Icons/Icons';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';

export const PasswordReset: React.FC = () => {
  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isSecondOpenEye, setIsSecondOpenEye] = useState(false);

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

        <form className={styles.form}>
          <FormField
            title={'Password'}
            type={isOpenEye ? 'text' : 'password'}
            placeholder={'Password'}
            required
            // onChange={}
          >
            <div
              className={styles.iconWrapper}
              onClick={() => handleShowPassword(true)}
            >
              <Icons name={isOpenEye ? 'eyeOpen' : 'eyeClose'} />
            </div>
          </FormField>

          <FormField
            title={'Repeat password'}
            type={isSecondOpenEye ? 'text' : 'password'}
            placeholder={'Repeat password'}
            required
            // onChange={}
          >
            <div
              className={styles.iconWrapper}
              onClick={() => handleShowPassword(false)}
            >
              <Icons name={isSecondOpenEye ? 'eyeOpen' : 'eyeClose'} />
            </div>
          </FormField>
          <MainButton name={'Apply'} gradient={true} fullwidth={true} />
        </form>
      </FormLayout>
    </PageLayout>
  );
};
