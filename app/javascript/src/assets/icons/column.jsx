import React from "react";

const ColumnIconSVG = ({ width = 20, height = 20, color = "#5C5F62" }) => (
  <svg
    fill="none"
    height={height}
    viewBox="0 0 20 20"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(-2 -2)">
      {/* Middle rectangle */}
      <rect fill="#ffffff" height="18" transform="translate(9 3)" width="6" />
      {/* Outer border */}
      <path
        d="M15,21H9V3h6Zm6-1V4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20Z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  </svg>
);

export default ColumnIconSVG;
