import React from 'react';
import classNames from 'classnames';
import styles from './RadialChart.module.scss';

const DEFAULT_COLOR = '#FC76A1';

type Props = {
  total: number,
  completed: number,
  radius?: number,
  strokeWidth?: number,
  color?: string,
  dimension?: number
};

export const RadialChart: React.FC<Props> = ({
  total,
  completed,
  radius= 18,
  strokeWidth = 5,
  color = DEFAULT_COLOR,
  dimension = 48,
}) => {
  const progress = (completed / total) * 100
  const circumference = 2 * 3.14 * radius;
  const progressSize = circumference / 100 * progress;
  const isCompleted = progress === 100;

  return (
    <div
      className={classNames(styles['radial-chart'], {
        [styles['no-progress']]: progressSize === 0,
      })}
    >
      <svg viewBox="0 0 48 48" width={dimension} height={dimension}>
        <circle
          className={styles['radial-chart-total']}
          stroke={color}
          strokeWidth={strokeWidth}
          fill={isCompleted ? color : 'none'}
          cx="24"
          cy="24"
          r={radius}
        />
        <circle
          className={styles['radial-chart-progress']}
          stroke={isCompleted? 'none' : color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressSize},${circumference}`}
          strokeLinecap="round"
          fill={isCompleted? color : 'none'}
          cx="24"
          cy="24"
          r={radius}
        />
      </svg>

      {isCompleted && (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className={styles.completed}>
          <path d="M15.4195 0.705467C15.8589 1.14492 15.8589 1.85859 15.4195 2.29805L6.41948 11.298C5.98003 11.7375 5.26636 11.7375 4.8269 11.298L0.326904 6.79805C-0.112549 6.35859 -0.112549 5.64492 0.326904 5.20547C0.766357 4.76601 1.48003 4.76601 1.91948 5.20547L5.62495 8.90742L13.8304 0.705467C14.2699 0.266014 14.9835 0.266014 15.423 0.705467H15.4195Z" fill="white"/>
        </svg>
      )}
    </div>
  );
};
