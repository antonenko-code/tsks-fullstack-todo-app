import React, { FormEvent, useMemo, useState } from 'react';
import styles from './Tasks.module.scss';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { Icons } from '../../shared/Icons/Icons';
import { ModalWindow } from '../../shared/ModalWindow';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { DatePicker } from '../../entities/DatePicker';
import { v4 as uuidv4 } from 'uuid';
import { add } from '../../features/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TaskItem } from '../../entities/TaskItem';
import { Todo } from '../../types/Todo';
import { Calendar } from '../../shared/Calendar';

export const Tasks: React.FC = (props) => {
  const { collections } = useAppSelector(state => state.collections)
  const { todos } = useAppSelector(state => state.todos)
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHideModal, setIsHideModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  const collection = useMemo(() => {
    return collections.find(collection => collection.id === id);
  }, [id]);

  const filteredByCollection = todos.filter((todo) => todo.collectionId === collection!.id);
  const tasksDates = filteredByCollection.map(task => new Date(task.date).toDateString());

  const filteredByDate = (tasks: Todo[], date: Date | null) => {
    if (date) {
      let stringDate = new Date(date).toDateString();
      return tasks.filter(task =>  new Date(task.date).toDateString() === stringDate);
    }
    return tasks;
  };

  const tasksForView = useMemo(() => {
    return filteredByDate(filteredByCollection, selectedDay)
  }, [selectedDay, collection, filteredByCollection]);


  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpenModal = (event: any) => {
    event.stopPropagation();
    setIsOpenModal(res => !res);
  };

  const closeModal = () => {
    setIsHideModal(true);
    const timer = setTimeout(() => {
      setIsOpenModal(false);
      setIsHideModal(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(/^[a-zA-Z0-9А-Яа-я \-\'\s]*$/);
    if (!regex.test(event.target.value)) {
      return;
    }
    if (title.trim().length > 0) {
      setErrorMessage(null);
    }
    setTitle(event.target.value);
  };

  const validation = (value: string) => {
    if (!value || !value.trim().length) {
      throw (`Field can't be empty`);
    } else {
      setErrorMessage(null);
    }
  };

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      validation(title);
      const id = uuidv4();
      if (!date) {
        return;
      }
      const newTodoItem = {
        title,
        id,
        completed: false,
        date: date,
        collectionId: collection?.id,
      };
      dispatch(add(newTodoItem));
      closeModal();
      setTitle('');
    } catch (error: any) {
      setErrorMessage(error);
      return;
    }
  };

  const handelSetDataToday = () => {
    setDate(new Date())
  }

  const handelSetDataTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow)
  };

  return (
    <PageLayout>
      <PageTitle
        title={collection!.title}
        button={true}
        onClick={handleGoBack}
      />

      <Calendar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        tasksDates={tasksDates}
      />

      <div className={styles.tasksWrapper}>
        {!tasksForView.length ? (
          <span className={styles.message}>There are no tasks yet!</span>
        ) : (
          tasksForView.map((todo: Todo) => {
            return (
              <TaskItem
                key={todo.id}
                todo={todo}
              />
            )
          })
        )}
      </div>

      <button
        type='button'
        className={styles.addButton}
        onClick={handleOpenModal}
      >
        <Icons name="plus" />
      </button>

      {isOpenModal && (
        <ModalWindow
          closeModal={closeModal}
          isHideModal={isHideModal}
        >
          <form
            className={styles.form}
            onSubmit={handleOnSubmit}
          >
            <div className={styles.modalFormFieldWrapper}>
              <FormField
                placeholder={'Some text'}
                value={title}
                maxLength={30}
                onChange={handleOnChange}
              />

              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}

              <DatePicker date={date} setDate={setDate} />

              <div className={styles.daysBtnWrapper}>
                <div
                  className={styles.daysBtn}
                  onClick={handelSetDataToday}
                >
                  Today
                </div>

                <div
                  className={styles.daysBtn}
                  onClick={handelSetDataTomorrow}
                >
                  Tomorrow
                </div>
              </div>
            </div>


            <div className={styles.modalBtnWrapper}>
              <MainButton
                name={'Add task'}
                type={'submit'}
                gradient={true}
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
    </PageLayout>
  );
};
