import React, { forwardRef } from "react";
import styles from './HorizontalDatePicker.module.scss'
import {
  addMonths,
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  isSameMonth,
  lastDayOfMonth,
  startOfDay,
} from 'date-fns';
import classNames from 'classnames';

export type Props = {
  startDate?: Date;
  endDate?: Date;
  selectedDay: Date | null,
  handleChangeCurrentDate: (date: Date | null) => void;
  startValue: Date | null;
  endValue: Date | null;
  tasksDates: string[]
  locale: Locale;
};

const eachDay = (start: Date, end: Date) => eachDayOfInterval({ start, end });

const eachMonth = (start: Date, end: Date) =>
  eachMonthOfInterval({ start, end });

export const Datepicker = forwardRef<HTMLDivElement, Props>(
  (
    {
      locale,
      endDate,
      selectedDay,
      handleChangeCurrentDate,
      startDate,
      endValue,
      startValue,
      tasksDates,
    },
    ref,
  ) => {
    const DATES = React.useMemo(() => {
      const startMonth = startDate ? startDate : new Date();
      const endMonth = endDate ? endDate : addMonths(startMonth, 3);
      const months = eachMonth(startMonth, endMonth);
      return months.map((month, idx) => {
        const last =
          endDate && isSameMonth(month, endDate)
            ? endDate
              ? endDate
              : month
            : lastDayOfMonth(month);

        const startDay = !idx ? (startDate ? startDate : new Date()) : month;
        const days = eachDay(startOfDay(startDay), startOfDay(last));

        return {
          month,
          days,
        };
      });
    }, [startDate, endDate]);

    const onDateClick = (selectedDate: Date) => {
      if (selectedDate === selectedDay) {
        handleChangeCurrentDate(null);
      } else {
        handleChangeCurrentDate(selectedDate);
      }
    };

    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const nextScroll = () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: +500,
          behavior: "smooth",
        });
      }
    };

    const prevScroll = () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: -500,
          behavior: "smooth",
        });
      }
    };

    return (
      <div ref={ref} className={styles.container}>
        <div ref={containerRef} className={styles.dateListScrollable}>
          {DATES.map(({ month, days }, idx) => {
            const currentMonth = format(month, "LLLL", { locale });

            return (
              <div key={currentMonth + idx} className={styles.monthContainer}>
                <div className={styles.daysContainer}>
                  {days.map((date, idx) => {
                    const isTask = tasksDates.find((d) => d === date.toDateString());
                    const dayLabel = format(date, "EEE", { locale });
                    const dateLabel = format(date, "d", { locale });
                    const isDaySelected = selectedDay &&
                      new Date(date).toDateString() === new Date(selectedDay).toDateString();
                    return (
                      <div
                        key={dayLabel + idx + currentMonth}
                        className={classNames(styles.dateDayItem, {
                          [styles.dateDayItemSelected]: isDaySelected
                        })}
                        onClick={() => onDateClick(date)}
                      >
                        <div
                          className={classNames(styles.dayLabel, {
                            [styles.active]: !isTask
                          })}
                        >
                          {dayLabel}
                        </div>
                        <div
                          className={classNames(styles.dateLabel, {
                            [styles.active]: !isTask
                          })}
                        >
                          {dateLabel}
                        </div>
                        <span
                          className={classNames(styles.pointHidden, {
                            [styles.point]: isTask
                          })}
                        >
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

Datepicker.displayName = "Datepicker";
