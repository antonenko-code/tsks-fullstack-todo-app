import React, { useEffect, useState } from 'react';
import styles from './CollectionItem.module.scss'
import { Icons } from '../../shared/Icons/Icons';
import { RadialChart } from '../../shared/RadialChart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteColor } from './reducers/collectionsSlice';

type Props = {
  title: string,
  total: number,
  completed: number,
  iconName?: string,
}

export const CollectionItem: React.FC<Props> = ({
  title,
  completed,
  total,
}) => {
  const [color, setColor] = useState('');
  const { colors } = useAppSelector(state => state.collections);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[randomIndex]);
    dispatch(deleteColor(randomIndex));
  }, [])

  return (
    <div className={styles.block}>
      <div className={styles.iconWrapper} style={{background: `${color}`}}>
        <Icons name={'checked'} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.blockProgress}>
        <div className={styles.tasksContainer}>
          <span className={styles.span}>tasks:</span>
          <div className={styles.infoProgress}>
            {completed < total
              ? (`${completed}/${total} done`)
              : (`All ${total} done`)
            }
          </div>
        </div>
        <RadialChart total={total} completed={completed} color={color} />
      </div>
    </div>
  );
};
