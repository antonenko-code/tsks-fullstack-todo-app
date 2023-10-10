import React, { useEffect, useState } from 'react';
import styles from './Calendar.module.scss';
import { Icons } from '../Icons/Icons';
import { enUS } from "date-fns/locale";
import { HorizontalDatePicker } from './HoroizontalDatePicker';

type Props = {
  selectedDay: Date | null,
  setSelectedDay: (value: (Date | null | ((value: Date | null) => any))) => void,
  tasksDates: string[],
};

export const Calendar: React.FC<Props> = ({ selectedDay, setSelectedDay, tasksDates }) => {
  const TODAY = new Date();
  const [nameMonth, setNameMonth] = useState('');
  const [dateForView, setDateForView] = useState(TODAY);
  const firstDayOfMonth = new Date(dateForView.getFullYear(), dateForView.getMonth(), 1);
  const handleChangeCurrentDate = (date: Date | null) => {
    setSelectedDay(date);
  };
  const handleSelectAllTasks = () => {
    setSelectedDay(null);
  };

  const changeMonth = (prevDate: Date, months: number) => {
    let date = new Date(prevDate);
    let change = prevDate.getMonth() + months;
    if (change >= 12) {
      change -= 12;
      date.setFullYear(prevDate.getFullYear() + 1);
    } else if (change <= -1) {
      change += 12;
      date.setFullYear(prevDate.getFullYear() - 1);
    }
    date.setMonth(change);
    return date;
  };

  const handleChangeMonth = (isSelected: Date | null, monthAmount: number) => {
    if (isSelected) {
      setSelectedDay(prev => {
        if (prev) {
          return changeMonth(prev, monthAmount);
        }
      });
      setDateForView(prev => {
        return changeMonth(prev, monthAmount);
      });
    } else {
      setDateForView((prev) => {
        const date = changeMonth(prev, monthAmount);
        date.setDate(1);
        return date;
      });
    }
  };

  const convertMonthToName = (d: Date) => {
    return new Date(d).toLocaleString('en-US', {month: 'long'});
  };

  useEffect(() => {
    selectedDay
      ? setNameMonth(convertMonthToName(selectedDay))
      : setNameMonth(convertMonthToName(dateForView));
  }, [selectedDay, dateForView]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.monthWrapper}>
          <button
            className={styles.buttonArrow}
            onClick={() => handleChangeMonth(selectedDay, -1)}
          >
            <Icons name={'arrowLeft'} />
          </button>
          <button
            className={styles.buttonArrow}
            onClick={() => handleChangeMonth(selectedDay, 1)}
          >
            <Icons name={'arrowRight'} />
          </button>
          <span className={styles.month}>{`${nameMonth}, `}</span>
          <span className={styles.year}>{selectedDay?.getFullYear() || dateForView.getFullYear()}</span>
        </div>
        <button
          className={styles.button}
          onClick={handleSelectAllTasks}
        >
          All
        </button>
      </div>
      <div className={styles.calendarWrapper}>
        <HorizontalDatePicker
          handleChangeCurrentDate={handleChangeCurrentDate}
          tasksDates={tasksDates}
          startDate={firstDayOfMonth}
          selectedDay={selectedDay}
          locale={enUS}
        />
      </div>
    </div>
  );
};
