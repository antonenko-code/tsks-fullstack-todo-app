import React, { FormEvent, useState } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import styles from './Collections.module.scss'
import { Icons } from '../../shared/Icons/Icons';
import { ModalWindow } from '../../shared/ModalWindow';
import { IconsSelector } from '../../entities/IconsSelector';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { CollectionItem } from '../../entities/CollectionItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {v4 as uuidv4} from 'uuid';
import { addCollection, deleteColor } from '../../entities/CollectionItem/reducers/collectionsSlice';
import { Link } from 'react-router-dom';

const MAX_LENGTH = 12;

export const Collections: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newItemTitle, setNewItemTitle] = useState('');
  const { icons, colors, collections } = useAppSelector(state => state.collections);
  const [selectedIcon, setSelectedIcon] = useState<string>(icons[0]);
  const dispatch = useAppDispatch();

  const validation = (value: string) => {
    if (!value || !value.trim().length) {
      throw (`Field can't be empty`);
    } else {
      setErrorMessage(null);
    }
  }

  const closeModal = () => {
    setHideModal(true);
    const timer = setTimeout(() => {
      setOpenModal(false);
      setHideModal(false);
    }, 500);
    return () => clearTimeout(timer);
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(/^[a-zA-Z0-9А-Яа-я \-\'\s]*$/);
    if (!regex.test(event.target.value)) {
      return;
    }
    if (newItemTitle.trim().length > 0) {
      setErrorMessage(null);
    }
    setNewItemTitle(event.target.value);
  }

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      validation(newItemTitle);
      const randomIndex = Math.floor(Math.random() * colors.length);
      const color = colors[randomIndex];
      dispatch(deleteColor(randomIndex));
      const id = uuidv4();
      const newCollection = {
        title: newItemTitle,
        iconName: selectedIcon,
        color,
        id,
      };

      dispatch(addCollection(newCollection));
      closeModal();
      setNewItemTitle('');
      setSelectedIcon(icons[0])
    } catch (error: any) {
      console.log('there')
      setErrorMessage(error);
      return;
    }
  };

  return (
    <PageLayout>
      <PageTitle title={'Collections'} button={true}/>
      <div className={styles.collectionContainer}>
        {collections.map((collectionItem) => (
          <Link
            to={collectionItem.id}
            className={styles.link}
            key={collectionItem.id}
            onClick={(event) => event.preventDefault()}
          >
            <CollectionItem
              title={collectionItem.title}
              color={collectionItem.color}
              iconName={collectionItem.iconName}
              id={collectionItem.id}
            />
          </Link>
        ))}
        {collections.length < MAX_LENGTH && (<button
          className={styles.addCollectionItemBtn}
          onClick={(event) => {
            event.stopPropagation();
            setOpenModal(!openModal);
          }}
        >
          <Icons name={'plus'}/>
        </button>)}
          {
            openModal && (
              <ModalWindow
                closeModal={closeModal}
                hideModal={hideModal}
              >
                <form
                  className={styles.form}
                  onSubmit={handleOnSubmit}
                >
                  <div className={styles.modalIconSelectorWrapper}>
                    <IconsSelector
                      selectedIcon={selectedIcon}
                      setSelectedIcon={setSelectedIcon}
                    />
                    <FormField
                      placeholder={'Some text'}
                      value={newItemTitle}
                      maxLength={12}
                      onChange={handleOnChange}
                    />
                    {
                      errorMessage && (
                        <div className={styles.errorMessage}>{errorMessage}</div>
                      )
                    }
                  </div>
                  <div className={styles.modalBtnWrapper}>
                    <MainButton
                      name={'Create'}
                      gradient={true}
                      type={'submit'}
                    />
                    <MainButton
                      name={'Cancel'}
                      type={'button'}
                      onClick={closeModal}
                    />
                  </div>
                </form>
              </ModalWindow>
          )
        }
      </div>
    </PageLayout>
  );
};
