import React, { useEffect, useRef, useState } from 'react';
import styles from './IconsSelector.module.scss';
import { Icons } from '../../shared/Icons/Icons';

type Props = {
  icon: string;
  onSelect: (option: string) => void
};

const OptionItem: React.FC<Props> = ({
  icon,
  onSelect,
}) => (
  <div
    className={styles.option}
    onClick={() => onSelect(icon)}
  >
    <Icons name={icon} />
  </div>
);

export const IconsSelector: React.FC = () => {
  const icons: string[] = [
    'home',
    'people',
    'work',
    'groceries',
    'car',
    'star',
    'vacation',
    'graduate',
    'medal',
    'workout',
    'love',
    'gift',
  ];
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: Event) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleOpenSelect = () => {
    setIsOpen(!isOpen)
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

//TODO: move this code to parent
  const [selectedIcon, setSelectedIcon] = useState<string | null>(icons[0]);

  const handleOptionSelect = (icon: string) => {
    setSelectedIcon(icon);
    setIsOpen(false);
  };
//--

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
              onSelect={handleOptionSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
