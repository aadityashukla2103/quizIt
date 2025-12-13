import React from "react";

import { Header as NeetoUiHeader } from "neetoui/layouts";

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const Header = ({ currentIndex, totalQuestions, timeLeft }) => (
  <div>
    <NeetoUiHeader
      title="Quiz Questions"
      actionBlock={
        timeLeft !== null && (
          <div className="mb-4 text-right text-lg font-semibold text-red-600">
            Time left: {formatTime(timeLeft)}
          </div>
        )
      }
    />
    <p className=" text-gray-500">
      Question {currentIndex + 1} of {totalQuestions}
    </p>
  </div>
);

export default Header;
