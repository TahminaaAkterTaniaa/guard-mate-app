import React from "react";

function HomeIcon({ active }) {
  const strokeColor = active ? "#293991" : "#596D79";
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
    >
      {active && (
        <path
          fill="#293991"
          d="M17.812 24.374v-5.625a.937.937 0 00-.938-.938h-3.75a.938.938 0 00-.937.938v5.625a.937.937 0 01-.938.937H5.625a.936.936 0 01-.938-.937V13.54a.937.937 0 01.307-.693l9.375-8.524a.937.937 0 011.261 0l9.376 8.524a.939.939 0 01.306.693v10.835a.937.937 0 01-.937.938h-5.626a.937.937 0 01-.937-.938z"
          opacity="0.3"
        ></path>
      )}

      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.812 24.374v-5.625a.937.937 0 00-.938-.938h-3.75a.938.938 0 00-.937.938v5.625a.937.937 0 01-.938.937H5.625a.936.936 0 01-.938-.937V13.54a.937.937 0 01.307-.693l9.375-8.524a.937.937 0 011.261 0l9.376 8.524a.939.939 0 01.306.693v10.835a.937.937 0 01-.937.938h-5.626a.937.937 0 01-.937-.938v0z"
      ></path>
    </svg>
  );
}

export default HomeIcon;
