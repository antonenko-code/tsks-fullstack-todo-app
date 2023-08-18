import React, { useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { FormLayout } from '../../shared/FormLayout';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { FormCheckbox } from '../../shared/FormCheckbox';
import styles from './Registration.module.scss';
import { Icons } from '../../shared/Icons/Icons';

export const Registration: React.FC = () => {
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
      <PageTitle title={'Registration'} />

      <FormLayout>
        <p>
          Keep track of the daily tasks in life and get that satisfaction upon completion.
        </p>

        <form
          className={styles.form}
        >
          <FormField
            title={'First name'}
            placeholder={'First name'}
          />

          <FormField
            title={'Second name'}
            placeholder={'Second name'}
          />

          <FormField
            title={'Email'}
            placeholder={'username@gmail.com'}
          />

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

          <FormCheckbox description={'I Agree to Privacy Policy'} />

          <MainButton name={'Sign up'} gradient={true} fullwidth={true} />
        </form>
      </FormLayout>
    </PageLayout>
  );
};
