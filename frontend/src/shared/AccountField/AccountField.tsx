import React from 'react';
import styles from './AccountField.module.scss';
import classNames from 'classnames';

type Props = {
  title?: string,
  value: string,
  btnName: string,
  gradient?: boolean,
  handleClick: (event: any) => void;
};

export const AccountField: React.FC<Props> = ({
  title,
  value,
  btnName,
  gradient,
  handleClick,
}) => {

  return (
    <div className={styles.block}>
      <span
        className={styles.title}
      >
        {title}
      </span>

      <div className={styles.fieldWrapper}>

        <span className={styles.value}>
            {value}
        </span>

        <button
          className={classNames(styles.button, {
            [styles.gradient]: gradient,
          })}
          onClick={(event) => handleClick(event)}
        >
          {btnName}
        </button>
      </div>
    </div>
  );
};
