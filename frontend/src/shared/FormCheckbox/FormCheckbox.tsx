import React, { FC } from 'react';
import styles from './FormCheckbox.module.scss'
import classNames from 'classnames';
import { Icons } from '../Icons/Icons';

type Props = {
  description?: string,
  isLarge?: boolean,
  isChecked: boolean,
  setIsChecked: (value: (boolean | ((value: boolean) => any))) => void,
}

export const FormCheckbox: FC<Props> = ({
  description,
  isLarge,
  isChecked,
  setIsChecked,

}) => {
  const handleChangeCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className={styles.block}>
      <div
        className={classNames(styles.inputWrapper,{
          [styles.inputWrapperLg] : isLarge
        })}
      >
        <input
          type='checkbox'
          id='checkboxAgreement'
          className={classNames(styles.input, {
            [styles.checked] : isChecked,
            [styles.inputLg] : isLarge,
          })}
          checked={isChecked}
          onChange={handleChangeCheckbox}
        />

        {isChecked && (
          <Icons name={'checked'} className={styles.checkedIcon} />
        )}
      </div>

      <label className={styles.label}>{description}</label>
    </div>

  );
};
