import React, { ReactNode, useState } from 'react';
import styles from './AccountField.module.scss';
import classNames from 'classnames';
import { FieldNames } from '../../pages/Account';

type Props = {
  titleField?: string,
  nameField: string | '',
  inputValue?: string,
  btnName: string,
  gradient?: boolean,
  handleClick: (el: string, event: any) => void;
};

// interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
//   children?: ReactNode;
//   // titleField?: string,
//   // inputValue?: string,
//   // btnName: string,
//   // gradient?: boolean,
//   // handleClick?: (el: string) => void;
// }

export const AccountField: React.FC<Props> = ({
  titleField,
  nameField,
  inputValue,
  btnName,
  gradient,
  handleClick,
  // children,
  // ...props,
}) => {

  return (
    <div className={styles.block}>
      <span
        className={styles.title}
      >
        {titleField}
      </span>

      <div className={styles.fieldWrapper}>

        <span className={styles.value}>
            {inputValue}
          {/*{hiddenInput ? password : inputValue}*/}
        </span>

        <button
          className={classNames(styles.button, {
            [styles.gradient]: gradient,
          })}
          onClick={(event) => handleClick(nameField, event)}
        >
          {btnName}
        </button>
      </div>
    </div>
  );
};
