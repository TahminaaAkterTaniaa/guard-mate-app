import React from "react";

function SettingIcon({ active }) {
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
          opacity="0.3"
          d="M6.13 10.734c.211-.445.457-.867.739-1.277L6.822 6.41c0-.281.117-.55.34-.738a12.157 12.157 0 013.703-2.145.908.908 0 01.797.082l2.613 1.57c.492-.034.984-.034 1.476 0l2.614-1.57a.979.979 0 01.808-.082c1.336.48 2.59 1.196 3.704 2.133a.93.93 0 01.328.738l-.047 3.047c.281.41.527.832.738 1.278l2.66 1.476c.246.14.422.375.469.656a12.131 12.131 0 010 4.266.934.934 0 01-.469.656l-2.66 1.477a9.25 9.25 0 01-.738 1.277l.047 3.047c0 .281-.118.55-.34.738a12.16 12.16 0 01-3.703 2.145.907.907 0 01-.797-.082l-2.613-1.57c-.493.035-.985.035-1.477 0l-2.613 1.57a.979.979 0 01-.809.082 12.097 12.097 0 01-3.703-2.133.93.93 0 01-.328-.738l.047-3.047a9.257 9.257 0 01-.739-1.277l-2.66-1.477a.935.935 0 01-.469-.656 12.13 12.13 0 010-4.266.935.935 0 01.47-.656l2.66-1.477z"
        ></path>
      )}      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M6.13 10.734c.211-.445.457-.867.739-1.277L6.822 6.41c0-.281.117-.55.34-.738a12.157 12.157 0 013.703-2.145.908.908 0 01.797.082l2.613 1.57c.492-.034.984-.034 1.476 0l2.614-1.57a.979.979 0 01.808-.082c1.336.48 2.59 1.196 3.704 2.133a.93.93 0 01.328.738l-.047 3.047c.281.41.527.832.738 1.278l2.66 1.476c.246.14.422.375.469.656a12.131 12.131 0 010 4.266.934.934 0 01-.469.656l-2.66 1.477a9.25 9.25 0 01-.738 1.277l.047 3.047c0 .281-.118.55-.34.738a12.16 12.16 0 01-3.703 2.145.907.907 0 01-.797-.082l-2.613-1.57c-.493.035-.985.035-1.477 0l-2.613 1.57a.979.979 0 01-.809.082 12.097 12.097 0 01-3.703-2.133.93.93 0 01-.328-.738l.047-3.047a9.257 9.257 0 01-.739-1.277l-2.66-1.477a.935.935 0 01-.469-.656 12.13 12.13 0 010-4.266.935.935 0 01.47-.656l2.66-1.477z"
      ></path>
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M15 20.625a5.625 5.625 0 100-11.25 5.625 5.625 0 000 11.25z"
      ></path>
    </svg>
  );
}

export default SettingIcon;
