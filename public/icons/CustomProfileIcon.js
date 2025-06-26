import React from "react";

function CustomProfileIcon({ isActive }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      {isActive ? (
        <>
          <path 
            fill="#293991" 
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          />
          <path 
            fill="#293991" 
            d="M12 14C7.03 14 3 18.03 3 23C3 23.2652 3.10536 23.5196 3.29289 23.7071C3.48043 23.8946 3.73478 24 4 24H20C20.2652 24 20.5196 23.8946 20.7071 23.7071C20.8946 23.5196 21 23.2652 21 23C21 18.03 16.97 14 12 14Z"
          />
        </>
      ) : (
        <>
          <path 
            stroke="#596D79" 
            strokeWidth="1.5"
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          />
          <path 
            stroke="#596D79" 
            strokeWidth="1.5"
            strokeLinecap="round" 
            strokeLinejoin="round"
            d="M12 14C7.03 14 3 18.03 3 23C3 23.2652 3.10536 23.5196 3.29289 23.7071C3.48043 23.8946 3.73478 24 4 24H20C20.2652 24 20.5196 23.8946 20.7071 23.7071C20.8946 23.5196 21 23.2652 21 23C21 18.03 16.97 14 12 14Z"
          />
        </>
      )}
    </svg>
  );
}

export default CustomProfileIcon;
