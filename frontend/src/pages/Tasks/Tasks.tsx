import React, { useMemo } from 'react';
import styles from './Tasks.module.scss';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { Icons } from '../../shared/Icons/Icons';
import { useAppSelector } from '../../app/hooks';

export const Tasks: React.FC = (props) => {
  const {collections} = useAppSelector(state => state.collections)
  const { id } = useParams();
  const navigate = useNavigate()

  const collection = useMemo(() => {
    return collections.find(collection => collection.id === id);
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <PageLayout>
      <PageTitle title={collection!.title} button={true} onClick={handleGoBack} />
      <div className={styles.tasksWrapper}>
        <span className={styles.message}>There are no tasks yet!</span>
      </div>
      <button type='button' className={styles.addButton}>
        <Icons name="plus" />
      </button>
    </PageLayout>
  );
};
