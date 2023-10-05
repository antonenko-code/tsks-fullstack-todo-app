import React, { FormEvent, useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import styles from './Account.module.scss';
import avatar from  '../../app/assets/images/avatar.png';
import { FormLayout } from '../../shared/FormLayout';
import { AccountField } from '../../shared/AccountField';
import { MainButton } from '../../shared/MainButton';
import { Icons } from '../../shared/Icons/Icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { ModalWindow } from '../../shared/ModalWindow';
import { FormField } from '../../shared/FormField';
import { UserService } from '../../services/UserService';
import { IRequestUserData } from '../../types/request/IRequestUserData';
import { updateUser } from '../../features/Auth/reducers/authSlice';

export enum FieldNames {
  FirstName = 'firstName',
  SecondName = 'secondName',
  Email = 'email',
  Password = 'password',
  NewPassword = 'newPassword',
};

export const Account: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [newValue, setNewValue] = useState<Partial<IRequestUserData>>({});
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldToChange, setFieldToChange] = useState<string>('');
  const [isHideModal, setIsHideModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpenModal = (fieldName: string, event: MouseEvent) => {
    event.stopPropagation();

    setIsModalOpen(true);
    setFieldToChange(fieldName);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(/^[a-zA-Z0-9А-Яа-я \-\'\s]*$/);
    const { name, value } = event.target;

    if (!regex.test(value) && fieldToChange !== FieldNames.Email) {
      return;
    }

    switch (name) {
      case FieldNames.Password: {
        setPassword(value);
        break;
      }
      case FieldNames.NewPassword: {
        setNewPassword(value);
        break;
      }
      default:
        setNewValue({[fieldToChange]: value});
    }

    setErrorMessage(null);
  };

  const closeModal = () => {
    setIsHideModal(true);

    const timer = setTimeout(() => {
      setIsHideModal(false);
      setIsModalOpen(false);
      setFieldToChange('');
      setPassword('');
      setNewPassword('');
      setNewValue({});
      setErrorMessage(null);
    }, 500);

    return () => clearTimeout(timer);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const emailBody = {email: newValue.email?.toLowerCase(), password};
    const passwordBody = {password, newPassword};

    switch (fieldToChange) {
      case FieldNames.Email: {
        if (!newValue.email?.length) {
          setErrorMessage('Enter Email');
          return;
        }

        if (!password.length) {
          setErrorMessage('Enter password');
          return;
        }
        break;
      }
      case FieldNames.Password: {
        if (!password.length) {
          setErrorMessage('Enter password');
          return;
        }

        if (!newPassword.length) {
          setErrorMessage('Enter New password');
          return;
        }
        break;
      }
    }

    if (errorMessage?.length) {
      return;
    }

    try {
      switch (fieldToChange) {
        case FieldNames.Email: {
          await UserService.updateUserFieldByField(fieldToChange, emailBody);
          break;
        }
        case FieldNames.Password: {
          await UserService.updateUserFieldByField(fieldToChange, passwordBody);
          break;
        }
        default: {
          await UserService.updateUserFieldByField(fieldToChange, newValue);
          break;
        }
      }

      if (fieldToChange !== FieldNames.Password) {
        dispatch(updateUser(newValue))
      }
      closeModal();
      setNewValue({});
    } catch (error) {
      setErrorMessage(`Something wrong`);
    }
  };

  return (
    <PageLayout>
      <PageTitle
        title={'My Account'}
        button={true}
        isOnLeft={true}
        onClick={handleGoBack}
      />

      <div className={styles.userWrapper}>
        <div className={styles.avatarWrapper}>
          <img src={avatar} alt="avatar"/>

          <div className={styles.chooseAvatar}>
            <Icons name={'pencil'} />
          </div>
        </div>

        <div className={styles.user}>
          <span className={styles.name}>
            {`${user.firstName} ${user.secondName}`}
          </span>

          <div className={styles.statusWrapper}>
            <div className={styles.subscribeStatus}>
              free
            </div>
          </div>
        </div>
      </div>

      <FormLayout fullWidth={true}>
        <AccountField
          titleField={'First Name'}
          nameField={FieldNames.FirstName}
          inputValue={user.firstName}
          btnName={'Change'}
          handleClick={handleOpenModal}
        />

        <AccountField
          titleField={'Last Name'}
          nameField={FieldNames.SecondName}
          inputValue={user.secondName}
          btnName={'Change'}
          handleClick={handleOpenModal}
        />

        <AccountField
          titleField={'Email'}
          nameField={FieldNames.Email}
          inputValue={user.email}
          btnName={'Change'}
          handleClick={handleOpenModal}
        />

        <AccountField
          titleField={'Password'}
          nameField={FieldNames.Password}
          inputValue={'********'}
          btnName={'Change'}
          handleClick={handleOpenModal}
        />
      </FormLayout>

      <FormLayout fullWidth={true}>
        <div className={styles.subscribeWrapper}>
          <span
            className={styles.title}
          >
            Subscription
          </span>

          <div className={styles.subscribeBlock}>
            <span
              className={styles.value}
            >
              Tsks Free
            </span>

            <MainButton name={'Upgrade to Pro'} gradient={true} />
          </div>
        </div>
      </FormLayout>

      <div className={styles.signOutWrapper}>
        <MainButton name={'Sign out'} />
      </div>

      {isModalOpen && (
        <ModalWindow
          closeModal={closeModal}
          isHideModal={isHideModal}
        >
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.modalFormFieldWrapper}>
              <h4>
                {fieldToChange === FieldNames.FirstName && (
                  'Enter new First name'
                )}

                {fieldToChange === FieldNames.SecondName && (
                  'Enter new Last name'
                )}

                {fieldToChange === FieldNames.Email && (
                  'Enter new Email'
                )}

                {fieldToChange === FieldNames.Password && (
                  'Enter your new password'
                )}
              </h4>

              {fieldToChange === FieldNames.FirstName && (
                <FormField
                  placeholder={'First Name'}
                  name={FieldNames.FirstName}
                  value={newValue.firstName}
                  maxLength={30}
                  onChange={handleOnChange}
                />
              )}

              {fieldToChange === FieldNames.SecondName && (
                <FormField
                  placeholder={'Last Name'}
                  name={FieldNames.SecondName}
                  value={newValue.secondName}
                  maxLength={30}
                  onChange={handleOnChange}
                />
              )}

              {fieldToChange === FieldNames.Email && (
                <>
                  <FormField
                    placeholder={'Email'}
                    name={FieldNames.Email}
                    value={newValue.email}
                    onChange={handleOnChange}
                  />

                  <FormField
                    type={'password'}
                    placeholder={'Current password'}
                    name={FieldNames.Password}
                    value={password}
                    onChange={handleOnChange}
                  />
                </>
              )}

              {fieldToChange === FieldNames.Password && (
                <>
                  <FormField
                    type={'password'}
                    placeholder={'Current password'}
                    name={FieldNames.Password}
                    value={password}
                    onChange={handleOnChange}
                  />

                  <FormField
                    type={'password'}
                    placeholder={'New password'}
                    name={FieldNames.NewPassword}
                    value={newPassword}
                    onChange={handleOnChange}
                  />
                </>
              )}


              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}

            </div>

            <div className={styles.modalBtnWrapper}>
              <MainButton
                name={'Accept'}
                type={'submit'}
                gradient={true}
              />

              <MainButton
                name={'Cancel'}
                type={'button'}
                onClick={closeModal}
              />
            </div>
          </form>
        </ModalWindow>
      )}
    </PageLayout>
  );
};
