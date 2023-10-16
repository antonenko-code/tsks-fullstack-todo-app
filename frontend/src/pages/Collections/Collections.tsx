import React, { FormEvent, useMemo, useEffect, useState } from 'react';
import styles from './Collections.module.scss'
import { PageLayout } from '../../shared/PageLayout';
import { Icons } from '../../shared/Icons/Icons';
import { PageTitle } from '../../shared/PageTitle';
import { ModalWindow } from '../../shared/ModalWindow';
import { IconsSelector } from '../../entities/IconsSelector';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { CollectionItem } from '../../entities/CollectionItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCollection, deleteCollection } from '../../features/Collections/reducers/collectionsSlice';
import { deleteAllByCollectionId } from '../../features/Tasks/TasksSlice';
import { UseHandlingErrors, InputNames } from '../../utils/UseHandlingErrors';
import { Collection } from '../../types/Collection';
import { CollectionsService } from '../../services/CollectionsService';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Loader } from '../../shared/Loader';
const MAX_LENGTH = 12;

export const Collections: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAcceptingModal, setIsOpenAcceptingModal] = useState(false);
  const [isHideModal, setIsHideModal] = useState(false);
  const [title, setTitle] = useState({collectionName: ''});
  const [collectionsFromServer, setCollectionsFromServer] = useState<Collection[]>([]);
  const [collectionsFromStorage, setCollectionsFromStorage] = useState<Collection[]>([]);
  const [deletingId, setDeletingId] = useState('')
  const { icons, collections } = useAppSelector(state => state.collections);
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const dispatch = useAppDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {onChangeValidation, errors, onSubmitValidation} = UseHandlingErrors();
  const { isAuth } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const colors = ['#f4d35e', '#aeb8fe', '#83c5be', '#ff36ab', '#ee9b00',
    '#3a86ff', '#ef233c', '#80ed99', '#9b5de5', '#15616d', '#f75c03', '#ff758f'];

  const viewCollections = useMemo(() => {
    return isAuth ? collectionsFromServer : collectionsFromStorage;
  }, [isAuth, collectionsFromServer, collectionsFromStorage]);

  viewCollections.forEach(collection => {
    let index = colors.indexOf(collection.color);
    if (index >= 0) {
      colors.splice(index, 1);
    }
  });

  const getCollectionData = async () => {
    try {
      setIsLoading(true)
      const response = await CollectionsService.getCollection();
      setCollectionsFromServer(response.data);
    } catch (error) {
      setCollectionsFromStorage(collections);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsHideModal(true);
    setIsSubmit(false);
    const timer = setTimeout(() => {
      setIsOpenModal(false);
      setTitle(({ collectionName: '' }));
      setIsOpenAcceptingModal(false);
      setIsHideModal(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValidation(event);
    setTitle(({collectionName: event.target.value}));
    setIsSubmit(false);
  }

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmit(true);
    onSubmitValidation(title, [InputNames.CollectionName]);
    const collectionName = title.collectionName;

    if (errors.size === 0 && collectionName) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      const color = colors[randomIndex];
      colors.splice(randomIndex, 1);
      const id = uuidv4();
      const newCollection = {
        title: collectionName,
        iconName: selectedIcon,
        color,
        id,
      };

      if (isAuth) {
        try {
          await CollectionsService.setCollection(newCollection);
          setCollectionsFromServer(prevState => [...prevState, newCollection]);
        } catch (error) {
          return;
        }
      } else {
        dispatch(addCollection(newCollection));
        setCollectionsFromStorage(prev => [...prev, newCollection])
      }

      setTitle(({ collectionName: '' }));
      closeModal();
      setSelectedIcon(icons[0])
    }
  };

  const handleAcceptingDelete = async () => {
    if (!colors.includes(collectionForDelete.color)) {
      colors.push(collectionForDelete.color);
    }
    if (!isAuth) {
      dispatch(deleteAllByCollectionId(deletingId));
      dispatch(deleteCollection(collectionForDelete));
      setCollectionsFromStorage(prevState => {
        return prevState.filter(collection => collection !== collectionForDelete)
      })
    } else {
      try {
        await CollectionsService.remove(deletingId);
        setCollectionsFromServer(prevState => prevState.filter((item: Collection) => item.id !== deletingId));
      } catch (error) {
        return
      }
    }

    closeModal();
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const collectionForDelete = useMemo(() => {
    return viewCollections.filter(collection => collection.id === deletingId)[0];
  }, [deletingId]);

  useEffect(() => {
    getCollectionData();
  }, [isAuth]);
  return (
    <PageLayout>
      <PageTitle
        title={'Collections'}
        button={!isAuth}
        onClick={handleGoBack}
        isOnLeft={true}
      />
      {isLoading ? (<div className={styles.loaderContainer}><Loader/></div>) : (
        <div className={styles.collectionContainer}>
          {viewCollections.map((collectionItem) => (
            <Link
              to={collectionItem.id}
              state={{
                collectionTitle: collectionItem.title,
                collectionId: collectionItem.id,
            }}
              className={styles.link}
              key={collectionItem.id}
            >
              <CollectionItem
                title={collectionItem.title}
                color={collectionItem.color}
                iconName={collectionItem.iconName}
                id={collectionItem.id}
                taskAmount={collectionItem.taskAmount}
                finishedTaskAmount={collectionItem.finishedTaskAmount}
                setIsOpenAcceptingModal={setIsOpenAcceptingModal}
                setDeletingId={setDeletingId}
              />
            </Link>
          ))}

          {viewCollections.length < MAX_LENGTH && (
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
                    fullwidth={true}
                  />

                  <MainButton
                    name={'Cancel'}
                    type={'button'}
                    fullwidth={true}
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
                Attention!
              </div>

              <div className={styles.acceptingText}>
                Are you sure you want to delete the collection <b>{collectionForDelete.title}</b> and all tasks?
              </div>

              <div className={styles.btnsWrapper}>
                <MainButton
                  name={'Delete'}
                  gradient={true}
                  type={'submit'}
                  fullwidth={true}
                  onClick={() => handleAcceptingDelete()}
                />
                <MainButton
                  name={'Cancel'}
                  type={'button'}
                  fullwidth={true}
                  onClick={closeModal}
                />
              </div>
            </ModalWindow>
          )
        }
      </div>
    )}
    </PageLayout>
  );
};
