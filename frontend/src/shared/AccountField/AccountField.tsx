import React, { useState } from 'react';
import styles from './AccountField.module.scss';
import classNames from 'classnames';

type Props = {
  titleField: string,
  inputValue: string,
  btnName: string,
  gradient?: boolean,
  hiddenInput?: boolean,
};

export const AccountField: React.FC<Props> = ({
  titleField,
  inputValue,
  btnName,
  gradient,
  hiddenInput,
}) => {
  const password = inputValue.replace(/./g, '* ')
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleClick = () => {
    setIsEdit(prevState => !prevState);
  };

  return (
    <div className={styles.block}>
      <span
        className={styles.title}
      >
        {titleField}
      </span>

      <div className={styles.inputWrapper}>
        <div>
          {!isEdit ? (
            <span
              className={styles.value}
            >
              {hiddenInput ? password : inputValue}
            </span>
          ) : (
            <input
              className={styles.input}
              value={inputValue}
            />
          )}
        </div>

        <button
          className={classNames(styles.button, {
            [styles.gradient]: gradient,
          })}
          onClick={handleClick}
        >
          {btnName}
        </button>
      </div>
    </div>
  );
};
