import React, { ReactNode, useEffect, useRef } from 'react';
import styles from './ModalWindow.module.scss'
import classNames from 'classnames';

type Props = {
  closeModal: () => void,
  isHideModal: boolean,
  isAccepting?: boolean,
  children: ReactNode,
  titleModal?: string,
}

export const ModalWindow: React.FC<Props> = ({
  children,
  closeModal,
  isHideModal,
  isAccepting,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeModal();
      }
    }

    document.addEventListener("click", checkIfClickedOutside)

    return () => {
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [isAccepting]);

  return (
    <div className={styles.background}>
      <div
        className={classNames([styles.containerModal], {
          [styles.containerHide]: isHideModal,
          [styles.containerSmaller]: isAccepting,
        })}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};
