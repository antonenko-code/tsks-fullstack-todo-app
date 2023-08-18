import React, { FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import style from './MainButton.module.scss';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  name: string,
  fullwidth?: boolean,
  gradient?: boolean,
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

export const MainButton: FC<Props> = ({
  name,
  fullwidth,
  gradient,
  ...props
}) => {
  return (
    <button
      className={classNames(style.button, {
        [style.fullwidth]: fullwidth,
        [style.gradient]: gradient,
      })}
      {...props}
    >
      {name}
    </button>
  );
};
