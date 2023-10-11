import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './TaskItem.module.scss'
import { FormCheckbox } from '../../shared/FormCheckbox';
import { Icons } from '../../shared/Icons/Icons';
import classNames from 'classnames';
import { Task } from '../../types/Task';
import { changeStatus, changeTitle } from '../../features/Tasks/TasksSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UseHandlingErrors, InputNames } from '../../utils/UseHandlingErrors';
import { TasksService } from '../../services/TasksService';

type Props = {
  task: Task,
  deleteTaskItem: (value: string) => void,
  setTasksFromServer: (value: (((prevState: Task[]) => Task[]) | Task[])) => void
}
const TODAY = new Date();

function getCurrentDate(props: Date | string) {
  const propsDate = new Date(props);
  const dateCurrent = TODAY.getDate();
  const monthCurrent = TODAY.getMonth() + 1;
  const yearCurrent = TODAY.getFullYear();
  const dateProps = propsDate.getDate();
  const monthProps = propsDate.getMonth() + 1;
  const yearProps = propsDate.getFullYear();
  let checking = monthCurrent === monthProps && yearCurrent === yearProps;

  if (dateCurrent === dateProps && checking) {
    return 'Today';
  } else if (dateCurrent + 1 === dateProps && checking) {
    return  'Tomorrow';
  } else {
    const monthFormat = monthProps < 10 ? `0${monthProps}` : monthProps;
    const dateFormat = dateProps < 10 ? `0${dateProps}` : dateProps;
    return `${dateFormat}.${monthFormat}.${yearProps}`
  }
}

export const TaskItem:React.FC<Props> = ({
  task,
  deleteTaskItem,
  setTasksFromServer,
}) => {
  const {
    id,
    title,
    date,
    completed,
  } = task;

  const [isBlurX1, setIsBlurX1] = useState(false);
  const [isBlurX2, setIsBlurX2] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [error, setError] = useState(false);
  const { isAuth } = useAppSelector(state => state.auth);

  const {onChangeValidation, errors} = UseHandlingErrors();
  const dispatch = useAppDispatch();

  const updateStatus = async (isChecked: boolean) => {
    const response = await TasksService.updateTask({completed: isChecked}, id);
    setTasksFromServer(prevState => {
      const editedTask = prevState.filter(task => task.id === id);
      editedTask[0].completed = response.data.completed;
      return prevState;
    })};

  const handleTitleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsEditing(true);
    setError(false);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValidation(event);
    const regex = new RegExp(/^[a-zA-Z0-9А-Яа-я \-'\s]*$/);

    if (!regex.test(event.target.value)) {
      return;
    }
    setNewTitle(event.target.value);
  };

  const handleApplyNewTitleOnBlur = async () => {
    if (newTitle.length >= 2) {
      setIsEditing(false);
      setError(false);
      if (isAuth) {
        const response = await TasksService.updateTask({title: newTitle}, id);
        setTasksFromServer(prevState => {
          const editedTask = prevState.filter(task => task.id === id);
          editedTask[0].title = response.data.title;
          return prevState;
        })
      } else {
        dispatch(changeTitle({id, newTitle}));
      }
    } else {
      setError(true);
    }
  }

  const handleApplyNewTitleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleApplyNewTitleOnBlur();
    }
  };

  const handleDeleteTask = (id: string) => {
    setIsDeleting(true);
    const timer = setTimeout(() => {
      deleteTaskItem(id);
      setIsDeleting(false)
    }, 800);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const { top } = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (top + 160 >= windowHeight && top + 80 < windowHeight) {
        setIsBlurX1(true);
      } else if (top + 80 >= windowHeight) {
        setIsBlurX2(true);
      } else {
        setIsBlurX1(false);
        setIsBlurX2(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const dateFowView = useMemo(() => {
    return getCurrentDate(date);
  }, [date]);

  const handleChangeStatus = (isChecked: boolean) => {
    // setIsChecked((prev) => !prev);
    if (isAuth) {
      updateStatus(isChecked);
    } else {
      dispatch(changeStatus({id, newStatus: isChecked}));
    }
  }

  return (
    <div
      ref={elementRef}
      className={classNames(styles.container, {
        [styles['blur-x1']]: isBlurX1,
        [styles['blur-x2']]: isBlurX2,
        [styles.deleting]: isDeleting,
      })
    }>
      <div className={styles.block}>
        <FormCheckbox
          isLarge={true}
          checked={task.completed}
          handleChangeStatus={handleChangeStatus}
        />

        <div
          className={styles.taskDetails}
          onDoubleClick={handleTitleClick}
          onBlur={handleApplyNewTitleOnBlur}
        >
          {isEditing ? (
            <>
              <input
                className={styles.input}
                value={newTitle}
                name={InputNames.TaskName}
                maxLength={30}
                onChange={handleTitleChange}
                onKeyDown={handleApplyNewTitleKeyDown}
                required
              />

              {errors.has(InputNames.TaskName) && error && (
                <div className={styles.errorMessage}>{errors.get(InputNames.TaskName)}</div>
              )}
            </>
          ) : (
            <div className={styles.description}>
              {newTitle}
            </div>
          )}

          <div className={styles.dateWrapper}>
            <Icons name={'calendar'} />

            <span className={styles.date}>
              {dateFowView}
            </span>
          </div>
        </div>

        <div
          className={styles.closeBtn}
          onClick={() => handleDeleteTask(id)}
        >
          <Icons name={'cross'} />
        </div>
      </div>
    </div>
  );
};
