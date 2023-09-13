import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.scss';
import { Icons } from '../../shared/Icons/Icons';

type Props = {
  date: Date | null,
  setDate: (newDate: Date | null) => void,
};

const CustomInput = forwardRef((props: any, ref) => {
  return (
    <div className="dateInput">
      <div className='dateIcon iconLeft'>
        <Icons name='calendar'/>
      </div>

      <input
        {...props}
        ref={ref}
        type="text"
      />

      <div className='dateIcon iconRight'>
        <Icons name='arrowDown'/>
      </div>
    </div>
  )
})

export const DatePicker: React.FC<Props> = ({ date, setDate }) => {
  const handleDateChange = (newDate: Date | null, event: React.MouseEvent) => {
    setDate(newDate);
    event.stopPropagation();
  };

  return (
    <ReactDatePicker
      renderCustomHeader={({
        monthDate,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type={'button'}
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            <Icons name='arrowLeft'/>
          </button>

          <span>{monthDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}</span>

          <button
            type={'button'}
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <Icons name='arrowRight' />
          </button>
        </div>
      )}
      dateFormat='dd.MM.yyyy'
      customInput={<CustomInput />}
      showIcon
      selected={date}
      onChange={handleDateChange}
      calendarClassName="calendar"
    />
  );
};
