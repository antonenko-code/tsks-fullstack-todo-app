import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './TaskItem.module.scss'
import { FormCheckbox } from '../../shared/FormCheckbox';
import { Icons } from '../../shared/Icons/Icons';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { changeStatus, changeTitle } from '../../features/todos/todosSlice';
import { useAppDispatch } from '../../app/hooks';

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
  const elementRef = useRef<HTMLDivElement>(null);
  const [isChecked, setIsChecked] = useState<boolean>(completed);
  const [inputField, setInputField] = useState(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const dispatch = useAppDispatch();

  const handleOnClick = (event: React.MouseEvent) => {
    if (event.detail === 2) {
      event.preventDefault();
      setInputField(true);
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(/^[a-zA-Z0-9А-Яа-я \-\'\s]*$/);

    if (!regex.test(event.target.value)) {
      return;
    }
    setNewTitle(event.target.value);
  };

  const handlerOnBlur = () => {
    const prevTitle = title;
    setInputField(false);

    if (newTitle.length) {
      dispatch(changeTitle({ id, newTitle }))
    } else {
      setNewTitle(prevTitle);
    }
  }

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handlerOnBlur();
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
          onClick={handleOnClick}
          onBlur={handlerOnBlur}
          onSubmit={() => setInputField(false)}
        >
          {inputField ? (
            <input
              className={styles.input}
              value={newTitle}
              maxLength={30}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              required
            />
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
