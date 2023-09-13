import React, { ReactNode, useEffect, useRef } from 'react';
import styles from './ModalWindow.module.scss'
import classNames from 'classnames';

type Props = {
  closeModal: () => void,
  isHideModal: boolean,
  children: ReactNode,
}

export const ModalWindow: React.FC<Props> = ({ children, closeModal, isHideModal}) => {
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
  }, []);

  return (
    <div className={styles.background}>
      <div
        className={classNames([styles.container], {
          [styles.containerHide]: isHideModal,
        })}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};
