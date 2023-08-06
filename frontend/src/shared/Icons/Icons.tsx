import React from 'react';

type Props = {
  name: string,
  className?: string,
}

export const Icons: React.FC<Props> = ({ name, className }) => {
  switch(name){
    case 'checked':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="18" viewBox="0 0 16 18" fill="none">
          <g clipPath="url(#clip0_23_86)">
            <path d="M15.4195 3.70547C15.8589 4.14493 15.8589 4.8586 15.4195 5.29805L6.41948 14.2981C5.98003 14.7375 5.26636 14.7375 4.8269 14.2981L0.326904 9.79805C-0.112549 9.3586 -0.112549 8.64493 0.326904 8.20547C0.766357 7.76602 1.48003 7.76602 1.91948 8.20547L5.62495 11.9074L13.8304 3.70547C14.2699 3.26602 14.9835 3.26602 15.423 3.70547H15.4195Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_23_86">
              <rect width="15.75" height="18" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      )
    case 'eyeOpen':
    case 'eyeClose':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 8C22 8 18 14 12 14C6 14 2 8 2 8" stroke="#717586" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15 13.5L16.5 16" stroke="#717586" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 11L22 13" stroke="#717586" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 13L4 11" stroke="#717586" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 13.5L7.5 16" stroke="#717586" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    default:
      return null;
  }
};
