import React from "react";

const AllQuizzesIcon = ({ width = 24, height = 24, color = "#5C5F62" }) => (
  <svg
    fill="none"
    height={height}
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill={color} height="6" rx="1.5" width="6" x="3" y="3" />
    <rect fill={color} height="6" rx="1.5" width="6" x="3" y="13" />
    <rect fill={color} height="6" rx="1.5" width="6" x="13" y="3" />
    <rect fill={color} height="6" rx="1.5" width="6" x="13" y="13" />
  </svg>
);

export default AllQuizzesIcon;
