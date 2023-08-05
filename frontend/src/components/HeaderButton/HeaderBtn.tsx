import { FC } from 'react';
import styles from './HeaderBtn.module.scss';
import classNames from 'classnames';

type Props = {
  text: string,
  border?: boolean,
};

export const HeaderBtn: FC<Props> = ({
  text,
  border,
}) => {
  return (
    <button
      name={text}
      type='button'
      className={classNames(styles.button, {
        [styles.border]: border
      })}
    >
      {text}
    </button>
  );
};
