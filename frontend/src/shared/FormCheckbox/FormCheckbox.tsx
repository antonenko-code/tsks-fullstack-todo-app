import React, { FC, useState } from 'react';
import styles from './FormCheckbox.module.scss'
import classNames from 'classnames';
import { Icons } from '../Icons/Icons';

type Props = {
  description?: string,
  isLarge?: boolean,
  checked: boolean,
  handleChangeStatus: (value: boolean) => void,
}

export const FormCheckbox: FC<Props> = ({
  description,
  isLarge,
  checked,
  handleChangeStatus,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

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
          onChange={() => {
            setIsChecked((prev) => !prev);
            handleChangeStatus(!isChecked)
          }}
        />

        {isChecked && (
          <Icons name={'checked'} className={styles.checkedIcon} />
        )}
      </div>

      <label className={styles.label}>{description}</label>
    </div>
  );
};
