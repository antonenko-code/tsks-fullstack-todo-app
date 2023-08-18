import { FC } from 'react';
import style from './HeaderButton.module.scss';
import classNames from 'classnames';

type Props = {
  text: string,
  border?: boolean,
};

export const HeaderButton: FC<Props> = ({
  text,
  border,
}) => {
  return (
    <button
      name={text}
      type='button'
      className={classNames(style.button, {
        [style.border]: border
      })}
    >
      {text}
    </button>
  );
};
