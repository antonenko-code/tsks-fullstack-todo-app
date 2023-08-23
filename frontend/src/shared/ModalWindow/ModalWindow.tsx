import React, { ReactNode, useEffect, useRef } from 'react';
import styles from './ModalWindow.module.scss'
import classNames from 'classnames';

type Props = {
  closeModal: () => void,
  hideModal: boolean,
  children: ReactNode,
}

export const ModalWindow: React.FC<Props> = ({ children, closeModal, hideModal
}) => {
  const ref = useRef<HTMLDivElement | null>(null);



  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
        // setOpenModal(false)
        // setHideModal(true);
        // const timer = setTimeout(() => closeModal(), 600);
        // return () => clearTimeout(timer);
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
        className={classNames([styles.container],
          {[styles.containerHide]: hideModal}
        )}
        ref={ref}>
        {children}
      </div>
    </div>
  );
};
