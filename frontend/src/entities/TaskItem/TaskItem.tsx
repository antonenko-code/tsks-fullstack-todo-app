import React from 'react';
import styles from './TaskItem.module.scss'
import { FormCheckbox } from '../../shared/FormCheckbox';
import { Icons } from '../../shared/Icons/Icons';

type Props = {
  description: string,
  date: Date,
}
const TODAY = new Date();

function getDate(props: Date) {
  const dateCurrent = TODAY.getDate();
  const monthCurrent = TODAY.getMonth() + 1;
  const yearCurrent = TODAY.getFullYear();
  const dateProps = props.getDate();
  const monthProps = props.getMonth() + 1;
  const yearProps = props.getFullYear();
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


export const TaskItem:React.FC<Props> = ({ description, date }) => {

  const dateFowView = getDate(date);

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <FormCheckbox isLarge={true}/>
        <div className={styles.taskDetails}>
          <div className={styles.description}>
            {description}
          </div>
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
