import React, { FormEvent, useEffect, useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import styles from './Account.module.scss';
import avatar from '../../app/assets/images/avatar.png';
import { FormLayout } from '../../shared/FormLayout';
import { AccountField } from '../../shared/AccountField';
import { MainButton } from '../../shared/MainButton';
import { Icons } from '../../shared/Icons/Icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/UserService';
import { IRequestUserData } from '../../types/request/IRequestUserData';
import { UseHandlingErrors } from '../../utils/UseHandlingErrors';
import { UpdateUserDataModal } from '../../features/UpdateUserDataModal';
import { updateUser } from '../../features/Auth/reducers/authSlice';
import { IBaseResponse } from '../../types/response/IBaseResponse';
import { IValidationError } from '../../types/response/IValidationError';
import { AxiosError } from 'axios';

export enum ChangeUser {
  FirstName = 'changeUserFirstName',
  SecondName = 'changeUserSecondName',
  Email = 'changeUserEmail',
  Password = 'changeUserPassword',
}

type Data = {
  title: string,
  value: string | unknown,
};

type LoginData = {
  [key: string]: {
    inputTitle: string,
    inputPlaceholder: string,
    inputName: string,
    type: string,
    value: string,
  }[];
};

export const Account: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const [userInfo, setUserInfo] = useState<Data[]>([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldToChange, setFieldToChange] = useState('');
  const [isHideModal, setIsHideModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { onChangeValidation, onSubmitValidation, errors } = UseHandlingErrors();
  const [errorMessageFromServer, setErrorMessageFromServer] = useState<IBaseResponse<any> | null>(null);
  const dispatch = useAppDispatch();

  const [loginData, setLoginData] = useState<LoginData>({
    changeUserFirstName: [
      {
        inputTitle: 'Enter new First name',
        inputPlaceholder: 'First Name',
        inputName: 'firstName',
        type: 'text',
        value: '',
      },
    ],

    changeUserSecondName: [
      {
        inputTitle: 'Enter new Second name',
        inputPlaceholder: 'Second Name',
        inputName: 'secondName',
        type: 'text',
        value: '',
      },
    ],

    changeUserEmail: [
      {
        inputTitle: 'Enter new email',
        inputPlaceholder: 'Email',
        inputName: 'email',
        type: 'text',
        value: '',
      },
      {
        inputTitle: 'Enter password',
        inputPlaceholder: 'Password',
        inputName: 'password',
        type: 'password',
        value: '',
      },
    ],

    changeUserPassword: [
      {
        inputTitle: 'Enter password',
        inputPlaceholder: 'Password',
        inputName: 'password',
        type: 'password',
        value: '',
      },
      {
        inputTitle: 'Enter new password',
        inputPlaceholder: 'New password',
        inputName: 'newPassword',
        type: 'password',
        value: '',
      },
    ],
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpenModal = (fieldKey: string, event: MouseEvent) => {
    event.stopPropagation();

    setIsModalOpen(true);
    setFieldToChange(fieldKey);
  };

  const clearValue = () => {
    setLoginData((prevState) => {
      const newState = { ...prevState };
      newState[fieldToChange]
        .forEach((field) => (
          field.value = ''
        ))

      return newState;
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    setErrorMessageFromServer(null);
    onChangeValidation(event);
    setLoginData((prevState) => {
      const newState = { ...prevState };
      newState[fieldToChange][index].value = value;

      return newState;
    });
    setIsSubmit(false);
  };

  const closeModal = () => {
    setIsHideModal(true);
    clearValue();
    setErrorMessageFromServer(null);

    const timer = setTimeout(() => {
      setIsHideModal(false);
      setIsModalOpen(false);
      setFieldToChange('');
    }, 500);
    setIsSubmit(false);

    return () => clearTimeout(timer);
  };

  const updateSubmits: {[index: string]:any} = {
    [ChangeUser.FirstName]: UserService.updateName,
    [ChangeUser.SecondName]: UserService.updateName,
    [ChangeUser.Email]: UserService.updateEmail,
    [ChangeUser.Password]: UserService.updatePassword,
  } as { [key in ChangeUser]: (userData: Partial<IRequestUserData>) => Promise<any> };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    let validationErrors: any;
    setIsSubmit(true);

    const submitMethod = updateSubmits[fieldToChange];
    const inputsData = loginData[fieldToChange];
    const dataToSend: { [key: string]: string } = {};

    inputsData.forEach((field) => {
      dataToSend[field.inputName] = field.value;
      validationErrors = onSubmitValidation(dataToSend, [field.inputName]);
    });

    if (validationErrors!.size > 0 || errors.size > 0) {
      return;
    }

    try {
      await submitMethod(dataToSend);
      dispatch(updateUser(dataToSend))
      closeModal();
    } catch (e) {
      const error = e as AxiosError;
      setErrorMessageFromServer(error.response?.data as IBaseResponse<IValidationError>);
    }
  };

  useEffect(() => {
    const currentUserInfo: Data[] = [
      {
        title: 'First name',
        value: user.firstName,
      },
      {
        title: 'Second name',
        value: user.secondName,
      },
      {
        title: 'Email',
        value: user.email,
      },
      {
        title: 'Password',
        value: '********',
      }
    ];
    setUserInfo(currentUserInfo);
  }, [user]);

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
            <Icons name={'pencil'}/>
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
        {userInfo.map((item: any, index) => {
          const {
            title,
            value,
          } = item;

          let action = Object.keys(loginData)[index]
          return (
            <AccountField
              key={title}
              title={title}
              value={value}
              btnName={'Change'}
              handleClick={(data) => handleOpenModal(action, data)}
            />
          );
        })}
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

            <MainButton name={'Upgrade to Pro'} gradient={true}/>
          </div>
        </div>
      </FormLayout>

      {isModalOpen && (
        <UpdateUserDataModal
          isSubmit={isSubmit}
          errorMessageFromServer={errorMessageFromServer}
          errors={errors}
          keyAction={loginData[fieldToChange]}
          closeModal={closeModal}
          isHideModal={isHideModal}
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
        />
      )}
    </PageLayout>
  );
};
