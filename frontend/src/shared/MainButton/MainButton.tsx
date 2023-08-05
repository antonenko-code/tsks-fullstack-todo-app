import { FC } from 'react';
import classNames from 'classnames';
import style from './MainButton.module.scss';

type Props = {
  text: string,
  fullwidth?: boolean,
  gradient?: boolean,
};

export const MainButton: FC<Props> = ({
  text,
  fullwidth,
  gradient,
}) => {
  return (
    <div>
      <button className={classNames(style.button, {
        [style.fullwidth]: fullwidth,
        [style.gradient]: gradient,
      })}>
        {text}
      </button>
    </div>
  );
};
