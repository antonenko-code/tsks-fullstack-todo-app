import { FC } from 'react';
import style from './HeaderButton.module.scss';
import classNames from 'classnames';

type Props = {
  name: string,
  border?: boolean,
};

export const HeaderButton: FC<Props> = ({
  name,
  border,
}) => {
  return (
    <button
      name={name}
      type='button'
      className={classNames(style.button, {
        [style.border]: border
      })}
    >
      {name}
    </button>
  );
};
