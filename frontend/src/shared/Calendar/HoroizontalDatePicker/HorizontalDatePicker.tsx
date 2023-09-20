import React, { forwardRef } from "react";
import styles from './HorizontalDatePicker.module.scss'
import '../../../app/assets/styles/index.scss'

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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss'

import { FreeMode, Mousewheel } from 'swiper'


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
const today = new Date().getDate() - 1;
const eachMonth = (start: Date, end: Date) =>
  eachMonthOfInterval({ start, end });

export const HorizontalDatePicker = forwardRef<HTMLDivElement, Props>(
  (
    {
      locale,
      endDate,
      selectedDay,
      handleChangeCurrentDate,
      startDate,
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
      if (selectedDate.toDateString() === selectedDay?.toDateString()) {
        console.log('if')
        handleChangeCurrentDate(null);
      } else {
        handleChangeCurrentDate(selectedDate);
      }
    };

    return (
      <Swiper
        className={styles.daysContainer}
        direction={'horizontal'}
        draggable={'true'}
        slidesPerView={'auto'}
        freeMode={true}
        mousewheel={true}
        modules={[FreeMode, Mousewheel]}
        spaceBetween={10}
        initialSlide={today}
      >
        {DATES.map(({ month, days }, idx) => {
          const currentMonth = format(month, "LLLL", { locale });
          return (
            <div key={idx}>
              {days.map((date, idx) => {
                const isTask = tasksDates.find((d) => d === date.toDateString());
                const dayLabel = format(date, "EEE", { locale });
                const dateLabel = format(date, "d", { locale });
                const isDaySelected = selectedDay &&
                  new Date(date).toDateString() === new Date(selectedDay).toDateString();
                const isToday = new Date(date).toDateString() === new Date().toDateString();
                return (
                  <SwiperSlide
                    key={dayLabel + idx + currentMonth}
                    className={classNames(styles.dateDayItem, {
                      [styles.dateDayItemSelected]: isDaySelected,
                      [styles.today]: isToday,
                    })}
                    onClick={() => onDateClick(date)}
                  >
                    <div
                      className={classNames(styles.dayLabel, {
                        [styles.active]: isTask,
                      })}
                    >
                      {dayLabel}
                    </div>
                    <div
                      className={classNames(styles.dateLabel, {
                        [styles.active]: isTask,
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
                  </SwiperSlide>
                );
              })}
            </div>
          );
        })}
      </Swiper>
    );
  },
);

HorizontalDatePicker.displayName = "Datepicker";
