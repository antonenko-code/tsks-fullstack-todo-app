import React, { useEffect, useRef, useState } from 'react';
import styles from './TaskItem.module.scss'
import { FormCheckbox } from '../../shared/FormCheckbox';
import { Icons } from '../../shared/Icons/Icons';
import classNames from 'classnames';

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
  const [isBlurX1, setIsBlurX1] = useState(false);
  const [isBlurX2, setIsBlurX2] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

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

  const dateFowView = getDate(date);

  return (
    <div
      ref={elementRef}
      className={classNames(styles.container, {
        [styles['blur-x1']]: isBlurX1,
        [styles['blur-x2']]: isBlurX2,
      })
    }>
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
