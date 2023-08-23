import React, { useEffect, useRef, useState } from 'react';
import styles from './IconsSelector.module.scss';
import { Icons } from '../../shared/Icons/Icons';
import { useAppSelector } from '../../app/hooks';

type OptionProps = {
  icon: string;
  onSelect: (option: string) => void
};

const OptionItem: React.FC<OptionProps> = ({
  icon,
  onSelect,
}) => (
  <div
    className={styles.option}
    onClick={(event) => {
      event.stopPropagation();
      onSelect(icon);
    }}
  >
    <Icons name={icon} />
  </div>
);

type SelectorProps = {
  selectedIcon: string,
  setSelectedIcon: (value: string) => void,

}

export const IconsSelector: React.FC<SelectorProps> = ({ selectedIcon, setSelectedIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const { icons } = useAppSelector(state => state.collections);
  const q = useAppSelector(state => state.collections)


  const handleClickOutside = (event: Event) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleOpenSelect = () => {
    setIsOpen(!isOpen)
  };

  const handleSelectIcon = (icon: string) => {
    setSelectedIcon(icon);
    setIsOpen(false);
  }


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={selectorRef}
      className={`
        ${styles.blockSelect} 
        ${isOpen 
          ? styles.open
          : ''
        }
      `}
    >
      <div
        className={styles.selectedOption}
        onClick={handleOpenSelect}
      >
        <div className={styles.iconWrapper}>
          <Icons name={`${selectedIcon}`} />
        </div>

        <Icons name={'arrowDown'} />
      </div>

      {isOpen && (
        <div className={styles.options}>
          {icons.map((name) => (
            <OptionItem
              key={name}
              icon={name}
              onSelect={handleSelectIcon}
            />
          ))}
        </div>
      )}
    </div>
  );
};
