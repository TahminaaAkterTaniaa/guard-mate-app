import React from 'react';

const CustomBellIcon = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  showRings = true,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Curved ring lines around the bell with gaps */}
      {showRings && (
        <g opacity="0.7">
          {/* Left curved rings with gap */}
          <path
            d="M2.5 5C2.5 5 0.5 7.5 0.5 11.5"
            stroke={color}
            strokeWidth={strokeWidth * 0.8}
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Right curved rings with gap */}
          <path
            d="M21.5 5C21.5 5 23.5 7.5 23.5 11.5"
            stroke={color}
            strokeWidth={strokeWidth * 0.8}
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
      
      {/* Main bell shape */}
      <path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
      />
      
      {/* Bell bottom clapper */}
      <path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default CustomBellIcon;