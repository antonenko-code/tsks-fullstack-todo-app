import React, { FormEvent, useMemo, useState } from 'react';
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
import { addCollection, deleteCollection, deleteColor } from '../../features/Collections/reducers/collectionsSlice';
import { deleteAllByCollectionId } from '../../features/todos/todosSlice'
import { Link, useNavigate } from 'react-router-dom';
import { UseHandlingErrors, InputNames } from '../../utils/UseHandlingErrors';

const MAX_LENGTH = 12;

export const Collections: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAcceptingModal, setIsOpenAcceptingModal] = useState(false);
  const [isHideModal, setIsHideModal] = useState(false);
  const [title, setTitle] = useState({
    collectionName: '',
  });
  const [deletingId, setDeletingId] = useState('')
  const { icons, colors, collections } = useAppSelector(state => state.collections);
  const [selectedIcon, setSelectedIcon] = useState<string>(icons[0]);
  const dispatch = useAppDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const {onChangeValidation, errors, onSubmitValidation} = UseHandlingErrors();
  const { isAuth } = useAppSelector(state => state.auth)
  const navigate = useNavigate();

  const closeModal = () => {
    setIsHideModal(true);
    setIsSubmit(false);
    const timer = setTimeout(() => {
      setIsOpenModal(false);
      setTitle(({ collectionName: '' }));
      setIsOpenAcceptingModal(false)
      setIsHideModal(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValidation(event);
    setTitle(({collectionName: event.target.value}));
    setIsSubmit(false);
  }

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsSubmit(true);
    onSubmitValidation(title, [InputNames.CollectionName]);
    const collectionName = title.collectionName;
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
      setTitle(({ collectionName: '' }));
      closeModal();
      setSelectedIcon(icons[0])
    }
  };

  const handleAcceptingDelete = () => {
    dispatch(deleteAllByCollectionId(deletingId));
    dispatch(deleteCollection(collectionForDelete));
    closeModal();
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const collectionForDelete = useMemo(() => {
    return collections.filter(collection => collection.id === deletingId)[0];
  }, [deletingId]);

  return (
    <PageLayout>
      <PageTitle
        title={'Collections'}
        button={!isAuth}
        onClick={handleGoBack}
        isOnLeft={true}
      />

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
              setIsOpenAcceptingModal={setIsOpenAcceptingModal}
              setDeletingId={setDeletingId}
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
                    value={title.collectionName}
                    maxLength={12}
                    onChange={handleOnChange}
                  />

                  {errors.has(InputNames.CollectionName) && isSubmit && (
                    <div className={styles.errorMessage}>{errors.get(InputNames.CollectionName)}</div>
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
        {isOpenAcceptingModal && (
            <ModalWindow
              closeModal={closeModal}
              isHideModal={isHideModal}
              isAccepting={true}
            >
              <div className={styles.acceptingTitle}>
                Action Confirmation
              </div>

              <div className={styles.acceptingText}>
                Are you sure you want to delete the collection <b>{collectionForDelete.title}</b> and all tasks?
              </div>

              <div className={styles.btnsWrapper}>
                <MainButton
                  name={'Delete'}
                  gradient={true}
                  type={'submit'}
                  onClick={() => handleAcceptingDelete()}
                />
                <MainButton
                  name={'Cancel'}
                  type={'button'}
                  onClick={closeModal}
                />
              </div>
            </ModalWindow>
          )
        }
      </div>
    </PageLayout>
  );
};
