import React, { FC, useState } from 'react';
import styles from './FormCheckbox.module.scss'
import classNames from 'classnames';
import { Icons } from '../Icons/Icons';

type Props = {
  description?: string,
  isLarge?: boolean,
}

export const FormCheckbox: FC<Props> = ({ description, isLarge }) => {
  const [isChecked, setIsChecked] = useState(false);

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
          onChange={() => setIsChecked((prev) => !prev)}
        />
        {isChecked && (
          <Icons name={'checked'} className={styles.checkedIcon} />
        )}
      </div>
      <label className={styles.label}>{description}</label>
    </div>

  );
};
