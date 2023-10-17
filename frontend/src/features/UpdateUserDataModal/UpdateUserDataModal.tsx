import React, { FormEvent, useEffect, useRef } from 'react';
import styles from './UpdateUserDataModal.module.scss'
import classNames from 'classnames';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { ModalWindow } from '../../shared/ModalWindow';
import { FormLayout } from '../../shared/FormLayout';
import { IBaseResponse } from '../../types/response/IBaseResponse';
import * as module from 'module';

type Props = {
  isSubmit: boolean,
  errorMessageFromServer: IBaseResponse<any> | null,
  errors: any,
  closeModal: () => void,
  isHideModal: boolean,
  isAccepting?: boolean,
  keyAction: InputKeys[],
  handleSubmit: (event: FormEvent) => void,
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>, el: number) => void;
}

interface InputKeys {
  inputTitle: string,
  inputPlaceholder: string,
  inputName: string,
  type: string,
  value: string,
}

export const UpdateUserDataModal: React.FC<Props> = ({
  isSubmit,
  errorMessageFromServer,
  errors,
  closeModal,
  isHideModal,
  isAccepting,
  keyAction,
  handleSubmit,
  handleOnChange,
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
        })}
        ref={ref}
      >
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.modalFormFieldWrapper}>
            {keyAction.map((input, index) => {
              const {inputTitle,
                inputPlaceholder,
                inputName,
                type,
                value,
              } = input;
              return (
                <div key={index}>
                  <div className={styles.formFieldWrapper}>
                    <FormField
                      title={inputTitle}
                      placeholder={inputPlaceholder}
                      name={inputName}
                      value={value}
                      type={type}
                      onChange={(event) => handleOnChange(event, index)}
                    />
                  </div>

                  {errors.has(inputName) && isSubmit && (
                    <div className={styles.errorMessage}>{errors.get(inputName)}</div>
                  )}
                </div>
              )
            })}

            {errorMessageFromServer && !errorMessageFromServer.success && (
              <div className={styles.errorMessage}>{errorMessageFromServer.message}</div>
            )}
          </div>

          <div className={styles.modalBtnWrapper}>
            <MainButton
              name={'Accept'}
              type={'submit'}
              gradient={true}
              fullwidth={true}
            />

            <MainButton
              name={'Cancel'}
              type={'button'}
              onClick={closeModal}
              fullwidth={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
