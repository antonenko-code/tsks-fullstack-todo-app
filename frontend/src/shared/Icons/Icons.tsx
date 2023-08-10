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
    case 'calendar':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M8.25 9.75H12M6 9.75H6.00673M9.75 12.75H6M12 12.75H11.9933" stroke="#8C8C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.5 1.5V3M4.5 1.5V3" stroke="#8C8C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1.875 9.1824C1.875 5.91446 1.875 4.28046 2.81409 3.26523C3.75318 2.25 5.26462 2.25 8.2875 2.25H9.7125C12.7354 2.25 14.2469 2.25 15.1859 3.26523C16.125 4.28046 16.125 5.91446 16.125 9.1824V9.5676C16.125 12.8356 16.125 14.4695 15.1859 15.4848C14.2469 16.5 12.7354 16.5 9.7125 16.5H8.2875C5.26462 16.5 3.75318 16.5 2.81409 15.4848C1.875 14.4695 1.875 12.8356 1.875 9.5676V9.1824Z" stroke="#8C8C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.25 6H15.75" stroke="#8C8C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    default:
      return null;
  }
};
