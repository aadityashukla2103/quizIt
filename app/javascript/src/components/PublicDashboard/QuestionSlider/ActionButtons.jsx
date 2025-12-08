import React from "react";

import { Button } from "neetoui";

const ActionButtons = ({ currentIndex, total, onPrev, onNext }) => {
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex + 1 === total;

  return (
    <div className="mt-3 flex gap-4">
      {!isFirstQuestion && (
        <Button label="Previous" size="large" onClick={onPrev} />
      )}
      <Button
        label={isLastQuestion ? "Save and submit the quiz" : "Next"}
        size="large"
        onClick={onNext}
      />
    </div>
  );
};

export default ActionButtons;
