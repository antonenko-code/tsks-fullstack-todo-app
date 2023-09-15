import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './TaskItem.module.scss'
import { FormCheckbox } from '../../shared/FormCheckbox';
import { Icons } from '../../shared/Icons/Icons';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { changeStatus, changeTitle } from '../../features/todos/todosSlice';
import { useAppDispatch } from '../../app/hooks';
import { UseHandlingErrors, InputNames } from '../../utils/UseHandlingErrors';

type Props = {
  todo: Todo,
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
  todo,
}) => {
  const {
    id,
    title,
    date,
    completed,
  } = todo;

  const [isBlurX1, setIsBlurX1] = useState<boolean>(false);
  const [isBlurX2, setIsBlurX2] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [error, setError] = useState<boolean>(false);
  const {onChangeValidation, errors} = UseHandlingErrors();
  const dispatch = useAppDispatch();


  const handleTitleClick = (event: React.MouseEvent) => {
    if (event.detail === 2) {
      event.preventDefault();
      setIsEditing(true);
      setError(false);
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(/^[a-zA-Z0-9А-Яа-я \-'\s]*$/);

    if (!regex.test(event.target.value)) {
      return;
    }

    onChangeValidation(event);
    setNewTitle(event.target.value);
  };

  const handleApplyNewTitleOnBlur = () => {
    if (newTitle.length >= 2) {
      setIsEditing(false);
      setError(false);
      dispatch(changeTitle({ id, newTitle }));
    } else {
      setError(true);
    }
  }

  const handleApplyNewTitleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleApplyNewTitleOnBlur();
    }
  };

  const handleContainerClick = () => {
    if (isEditing) {
      setNewTitle(title);
      setIsEditing(false);
      setError(false);
    }
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

  useEffect(() => {
    dispatch(changeStatus(id))
  }, [isChecked])

  return (
    <div
      ref={elementRef}
      className={classNames(styles.container, {
        [styles['blur-x1']]: isBlurX1,
        [styles['blur-x2']]: isBlurX2,
      })
    }>
      <div className={styles.block}>
        <FormCheckbox
          isLarge={true}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />

        <div
          className={styles.taskDetails}
          onClick={handleTitleClick}
          onBlur={handleApplyNewTitleOnBlur}
        >
          {isEditing ? (
            <>
              <input
                onBlur={handleContainerClick}
                className={styles.input}
                value={newTitle}
                name={InputNames.TodoName}
                maxLength={30}
                onChange={handleTitleChange}
                onKeyDown={handleApplyNewTitleKeyDown}
                required
              />

              {errors.has(InputNames.TodoName) && error && (
                <div className={styles.errorMessage}>{errors.get(InputNames.TodoName)}</div>
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
      </div>
    </div>
  );
};
