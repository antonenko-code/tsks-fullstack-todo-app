import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import styles from './Tasks.module.scss';
import { PageLayout } from '../../shared/PageLayout';
import { PageTitle } from '../../shared/PageTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from '../../shared/Icons/Icons';
import { ModalWindow } from '../../shared/ModalWindow';
import { FormField } from '../../shared/FormField';
import { MainButton } from '../../shared/MainButton';
import { DatePicker } from '../../entities/DatePicker';
import { v4 as uuidv4 } from 'uuid';
import { add, deleteTask } from '../../features/Tasks/TasksSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TaskItem } from '../../entities/TaskItem';
import { Task } from '../../types/Task';
import { Calendar } from '../../shared/Calendar';
import { TasksService } from '../../services/TasksService';
import { Loader } from '../../shared/Loader';

export const Tasks: React.FC = () => {
  const { tasks } = useAppSelector(state => state.tasks);
  const [tasksFromServer, setTasksFromServer] = useState<Task[]>([]);
  const [tasksFromStorage, setTasksFromStorage] = useState<Task[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHideModal, setIsHideModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [title, setTitle] = useState('');
  const { isAuth } = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  const tasksForView = useMemo(() => {
    return isAuth ? tasksFromServer : tasksFromStorage;
  }, [isAuth, tasksFromServer, tasksFromStorage]);
  const { state } = useLocation();
  const { collectionTitle, collectionId } = state;

  const filteredByDate = (tasks: Task[], date: Date | null) => {
    if (date) {
      let stringDate = new Date(date).toDateString();
      return tasks.filter(task =>  new Date(task.date).toDateString() === stringDate);
    }
    return tasks;
  };

  const getTasksFromServer = async () => {
    try {
      const response = await TasksService.getTasks(collectionId);
      setTasksFromServer(response.data);
    } catch (error) {
      setTasksFromStorage(tasks);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredByCollection = useMemo(() => {
    if (isAuth) {
      return tasksForView;
    }
    return tasksForView.filter((task) => task.collectionId === collectionId)
  }, [collectionId, isAuth, tasksForView]);

  const tasksDates = useMemo(() => {
    return filteredByCollection.map(task => new Date(task.date).toDateString())
  }, [filteredByCollection]);

  const filteredTasks = useMemo(() => {
    return filteredByDate(filteredByCollection, selectedDay)
  }, [selectedDay, filteredByCollection]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpenModal = (event: any) => {
    event.stopPropagation();
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsHideModal(true);
    const timer = setTimeout(() => {
      setIsOpenModal(false);
      setIsHideModal(false);
      setTitle('');
    }, 400);
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

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      validation(title);
      if (!date) {
        return;
      }

      if (isAuth) {
        const response = await TasksService.setTask({
          title: title,
          completed: false,
          date: date,
        }, collectionId);
        setTasksFromServer(prevState => [...prevState, response.data])
      } else {
        const id = uuidv4();
        const newTaskItem = {
          title: title,
          id,
          completed: false,
          date: date,
          collectionId,
        };
        dispatch(add(newTaskItem));
        setTasksFromStorage(prev => [...prev, newTaskItem]);
      }

      closeModal();
      setTitle('');
    } catch (error: any) {
      setErrorMessage(error);

      return;
    }
  };

  const handelSetDataToday = () => {
    setDate(new Date());
  }

  const handelSetDataTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow)
  };

  const deleteTaskItem = async (id: string) => {
    if (isAuth) {
      const response = await TasksService.deleteTask(id);
      setTasksFromServer(prevState => prevState.filter(task => task.id !== response.data.id))
    } else {
      dispatch(deleteTask(id));
      setTasksFromStorage(prev => {
        return prev.filter(task => task.id !== id);
      });
    }
  };

  useEffect(() => {
      getTasksFromServer();
  }, [isAuth]);

  return (
    <PageLayout>
      <PageTitle
        title={collectionTitle || ""}
        button={true}
        onClick={handleGoBack}
        isOnLeft={true}
      />

      <Calendar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        tasksDates={tasksDates}
      />
      {isLoading ? (<div className={styles.loaderContainer}><Loader/></div>) : (
        <div className={styles.tasksWrapper}>
          {!filteredTasks.length ? (
            <span className={styles.message}>There are no tasks yet!</span>
          ) : (
            filteredTasks.map((task: Task) => {
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  deleteTaskItem={deleteTaskItem}
                  setTasksFromServer={setTasksFromServer}
                />
              )
            })
          )}
        </div>
      )}

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
    </PageLayout>
  );
};
