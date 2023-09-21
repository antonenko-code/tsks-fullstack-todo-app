import React from 'react';
import styles from './HorizontalDatePicker.module.scss'
import '../../../app/assets/styles/index.scss'
import { eachDayOfInterval, format, lastDayOfMonth } from 'date-fns';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper'
import 'swiper/scss'

export type Props = {
  startDate: Date;
  selectedDay: Date | null,
  handleChangeCurrentDate: (date: Date | null) => void;
  tasksDates: string[]
  locale: Locale;
};

export const HorizontalDatePicker: React.FC<Props> = ({
  locale,
  selectedDay,
  handleChangeCurrentDate,
  startDate,
  tasksDates,
}) => {
  const currentDate = new Date().getDate();
  const last = lastDayOfMonth(startDate);

  const DATES = React.useMemo(() => {
    return eachDayOfInterval({end: last, start: startDate, });
  }, [startDate, last]);

  const onClickSelectDay = (selectedDate: Date) => {
    if (selectedDate.toDateString() === selectedDay?.toDateString()) {
      handleChangeCurrentDate(null);
    } else {
      handleChangeCurrentDate(selectedDate);
    }
  };

  return (
    <Swiper
      direction={'horizontal'}
      draggable={'true'}
      slidesPerView={'auto'}
      freeMode={true}
      mousewheel={true}
      modules={[FreeMode, Mousewheel]}
      spaceBetween={10}
      initialSlide={currentDate - 1}
    >
      {DATES.map(( date, idx) => {
        const isTask = tasksDates.find((d) => d === date.toDateString());
        const dayLabel = format(date, "EEE", { locale });
        const dateLabel = format(date, "d", { locale });
        const isToday = new Date(date).toDateString() === new Date().toDateString();
        const isDaySelected = selectedDay &&
          new Date(date).toDateString() === new Date(selectedDay).toDateString();
          return (
            <SwiperSlide
              key={dayLabel + idx}
              className={classNames(styles.dateDayItem, {
                [styles.dateDayItemSelected]: isDaySelected,
                [styles.today]: isToday,
              })}
              onClick={() => onClickSelectDay(date)}
            >
              <div
                className={classNames(styles.dayLabel, {
                  [styles.withTasks]: isTask,
                })}
              >
                {dayLabel}
              </div>

              <div
                className={classNames(styles.dateLabel, {
                  [styles.withTasks]: isTask,
                })}
              >
                {dateLabel}
              </div>

              <span
                className={classNames(styles.pointHidden, {
                  [styles.point]: isTask,
                })}
              >
              </span>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
