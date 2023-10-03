import React, { MouseEventHandler, useMemo, useState } from 'react';
import styles from './CollectionItem.module.scss'
import { Icons } from '../../shared/Icons/Icons';
import { RadialChart } from '../../shared/RadialChart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeCollection } from '../../features/Collections/reducers/collectionsSlice';
import { InputNames, UseHandlingErrors } from '../../utils/UseHandlingErrors';
import classNames from 'classnames';
import { CollectionsService } from '../../services/CollectionsService';

type Props = {
  title: string,
  color: string,
  iconName: string,
  id: string,
  taskAmount?: number,
  finishedTaskAmount?: number,
  setIsOpenAcceptingModal: (value: boolean) => void,
  setDeletingId: (value: string) => void,
}

export const CollectionItem: React.FC<Props> = ({
  title,
  color,
  iconName,
  id,
  taskAmount,
  finishedTaskAmount,
  setIsOpenAcceptingModal,
  setDeletingId,
}) => {
  const { onChangeValidation, errors } = UseHandlingErrors();
  const [inputField, setInputField] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { tasks } = useAppSelector(state => state.tasks);
  const { isAuth } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const totalTasksCount = useMemo(() => {
    return taskAmount
      ? taskAmount
      : tasks.filter(task => task.collectionId === id).length ;
  }, [id, tasks, taskAmount]);

  const completedTasksCount = useMemo(() => {
    return finishedTaskAmount
      ? finishedTaskAmount
      : tasks.filter(task => task.completed).length;
  }, [finishedTaskAmount, tasks]);

  const handleDeleteCollection: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpenAcceptingModal(true);

    setDeletingId(id);
  };

  const handleOnClick = (event: React.MouseEvent) => {
    if (event.detail === 1) {
      event.preventDefault();
    } else if (event.detail === 2) {
      event.preventDefault();
      setInputField(true);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValidation(event);

    const title = event.target.value;

    const regex = new RegExp(/^[a-zA-Z0-9А-Яа-я \-'\s]*$/);
    if (!regex.test(title)) {
      return;
    }

    setNewTitle(title);
  };

  const handlerOnBlur = async () => {
    setInputField(false)
    if (newTitle.length && errors.size === 0) {
      if (isAuth) {
        await CollectionsService.changeTitle(id, newTitle)
      } else {
        dispatch(changeCollection({id, title: newTitle}))
      }
    } else {
      setNewTitle(title)
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handlerOnBlur();
    }
  };

  return (
    <div className={styles.block}>
      <div className={styles.iconsWrapper}>
        <div className={styles.iconWrapper} style={{background: `${color}`}}>
          <Icons name={iconName} />
        </div>

        <div
          className={styles.closeBtn}
          onClick={handleDeleteCollection}
        >
          <Icons name={'cross'} />
        </div>
      </div>

      <form
        className={classNames(styles.title,
          {[styles.smallerTitle] : newTitle.length > 9}
        )}
        onClick={handleOnClick}
        onBlur={handlerOnBlur}
        onSubmit={() => setInputField(false)}
      >
        {inputField ? (
            <input
              className={styles.input}
              value={newTitle}
              name={InputNames.CollectionName}
              maxLength={12}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              required
            >
            </input>
          ) : (newTitle)}
      </form>

      <div className={styles.blockProgress}>
        <div className={styles.tasksContainer}>
          <span className={styles.span}>tasks:</span>

          <div className={styles.infoProgress}>
            {totalTasksCount === 0
              ? (`No tasks yet`)
              : (completedTasksCount < totalTasksCount
                ? (`${completedTasksCount}/${totalTasksCount} done`)
                : (`All tasks done`)
              )
            }
          </div>
        </div>

        <RadialChart
          total={totalTasksCount}
          completed={completedTasksCount}
          color={color}
        />
      </div>
    </div>
  );
};
