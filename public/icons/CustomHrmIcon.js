import React from "react";

function CustomHrmIcon({ isActive }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      {isActive ? (
        <>
          <path 
            fill="#293991" 
            d="M20 7V17C20 19.2091 18.2091 21 16 21H8C5.79086 21 4 19.2091 4 17V7C4 4.79086 5.79086 3 8 3H16C18.2091 3 20 4.79086 20 7Z"
          />
          <path 
            fill="white"
            d="M17 9C17 9.55228 16.5523 10 16 10C15.4477 10 15 9.55228 15 9C15 8.44772 15.4477 8 16 8C16.5523 8 17 8.44772 17 9Z"
          />
          <path 
            fill="white"
            d="M15 15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15V16.5C9 16.7761 9.22386 17 9.5 17H14.5C14.7761 17 15 16.7761 15 16.5V15Z"
          />
          <path 
            fill="white"
            d="M13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
          />
          <path 
            fill="white"
            d="M9 9C9 9.55228 8.55228 10 8 10C7.44772 10 7 9.55228 7 9C7 8.44772 7.44772 8 8 8C8.55228 8 9 8.44772 9 9Z"
          />
        </>
      ) : (
        <>
          <rect 
            x="4" 
            y="3" 
            width="16" 
            height="18" 
            rx="4" 
            stroke="#596D79" 
            strokeWidth="1.5"
          />
          <circle 
            cx="16" 
            cy="9" 
            r="1" 
            stroke="#596D79" 
            strokeWidth="1.5"
          />
          <circle 
            cx="12" 
            cy="9" 
            r="1" 
            stroke="#596D79" 
            strokeWidth="1.5"
          />
          <circle 
            cx="8" 
            cy="9" 
            r="1" 
            stroke="#596D79" 
            strokeWidth="1.5"
          />
          <path 
            d="M15 15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15V16.5C9 16.7761 9.22386 17 9.5 17H14.5C14.7761 17 15 16.7761 15 16.5V15Z" 
            stroke="#596D79" 
            strokeWidth="1.5"
          />
        </>
      )}
    </svg>
  );
}

export default CustomHrmIcon;
