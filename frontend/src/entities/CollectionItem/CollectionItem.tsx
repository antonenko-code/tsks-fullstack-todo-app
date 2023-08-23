import React, { useState } from 'react';
import styles from './CollectionItem.module.scss'
import { Icons } from '../../shared/Icons/Icons';
import { RadialChart } from '../../shared/RadialChart';
import { useAppDispatch } from '../../app/hooks';
import { deleteCollection, changeCollection } from './reducers/collectionsSlice';

type Props = {
  title: string,
  color: string,
  iconName: string,
  id: string,
}

export const CollectionItem: React.FC<Props> = ({
  title,
  color,
  iconName,
  id,
}) => {
  const [inputField, setInputField] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useAppDispatch();

  const handleDeleteCollection = () => {
    dispatch(deleteCollection({
      title,
      color,
      iconName,
      id,
    }));
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(/^[a-zA-Z0-9А-Яа-я \-\'\s]*$/);

    if (!regex.test(event.target.value)) {
      return;
    }
    setNewTitle(event.target.value);
  };

  const handlerOnBlur = () => {
    setInputField(false)
    if (newTitle.length) {
      dispatch(changeCollection({id, title: newTitle}))
    } else {
      setNewTitle(title)
    }
  }

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handlerOnBlur();
    }
    console.log(event.key)

  }

  return (
    <div className={styles.block}>
      <div className={styles.iconsWrapper}>
        <div className={styles.iconWrapper} style={{background: `${color}`}}>
          <Icons name={iconName} />
        </div>
        <div
          className={styles.closeBtn}
          onClick={handleDeleteCollection}
        >
          <Icons name={'cross'} />
        </div>
      </div>
      <div
        className={styles.title}
        onDoubleClick={() => setInputField(true)}
        onBlur={handlerOnBlur}
        onSubmit={() => setInputField(false)}
      >
        {inputField ?
          (
            <input
              className={styles.input}
              value={newTitle}
              maxLength={12}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              required
            >
            </input>
          ) : (newTitle)
        }
      </div>
      <div className={styles.blockProgress}>
        <div className={styles.tasksContainer}>
          <span className={styles.span}>tasks:</span>
          <div className={styles.infoProgress}>
            {/*{completed < total*/}
            {/*  ? (`${completed}/${total} done`)*/}
            {/*  : (`All ${total} done`)*/}
            {/*}*/}
          </div>
        </div>
        {/*<RadialChart total={total} completed={completed} color={'blue'} />*/}
      </div>
    </div>
  );
};
