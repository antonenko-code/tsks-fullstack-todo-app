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
import { v4 as uuidv4 } from 'uuid';
import { addCollection, deleteColor } from '../../features/Collections/reducers/collectionsSlice';
import { Link } from 'react-router-dom';
import { useForm, InputNames } from '../../utils/useForm';

const MAX_LENGTH = 12;

export const Collections: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHideModal, setIsHideModal] = useState(false);
  const { icons, colors, collections } = useAppSelector(state => state.collections);
  const [selectedIcon, setSelectedIcon] = useState<string>(icons[0]);
  const dispatch = useAppDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const {onChange, values, errors} = useForm();

  const closeModal = () => {
    setIsHideModal(true);
    setIsSubmit(false);
    const timer = setTimeout(() => {
      setIsOpenModal(false);
      setIsHideModal(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setIsSubmit(false);
  }

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsSubmit(true);
    const collectionName = values.get(InputNames.CollectionName);
    if (errors.size === 0 && collectionName) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      const color = colors[randomIndex];
      dispatch(deleteColor(randomIndex));
      const id = uuidv4();
      const newCollection = {
        title: collectionName,
        iconName: selectedIcon,
        color,
        id,
      };
      dispatch(addCollection(newCollection));
      closeModal();
      setSelectedIcon(icons[0])
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
          >
            <CollectionItem
              title={collectionItem.title}
              color={collectionItem.color}
              iconName={collectionItem.iconName}
              id={collectionItem.id}
            />
          </Link>
        ))}

        {collections.length < MAX_LENGTH && (
          <button
            className={styles.addCollectionItemBtn}
            onClick={(event) => {
              event.stopPropagation();
              setIsOpenModal(!isOpenModal);
            }}
          >
            <Icons name={'plus'} />
          </button>
        )}

          {isOpenModal && (
            <ModalWindow
              closeModal={closeModal}
              isHideModal={isHideModal}
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
                    name={InputNames.CollectionName}
                    value={values.get(InputNames.CollectionName)}
                    maxLength={12}
                    onChange={handleOnChange}
                  />

                  {errors.has(InputNames.CollectionName) && isSubmit && (
                    <div>{errors.get(InputNames.CollectionName)}</div>
                  )}
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
          )}
      </div>
    </PageLayout>
  );
};
