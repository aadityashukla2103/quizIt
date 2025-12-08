import React from "react";

const OptionCard = ({ option, selectedOptionId }) => {
  const isCorrect = option.is_correct;
  const isSelected = option.id === selectedOptionId;
  const unanswered = selectedOptionId === null;

  let boxClass = "border-gray-300 bg-white";
  let label;

  if (unanswered && isCorrect) {
    boxClass = "border-green-500 bg-green-50";
    label = "✓ Correct Answer";
  }

  if (!unanswered) {
    if (isCorrect) {
      boxClass = "border-green-500 bg-green-50";
      label = "✓ Correct Answer";
    } else if (isSelected) {
      boxClass = "border-red-500 bg-red-50";
      label = "✗ Your Answer";
    }
  }

  return (
    <div className={`rounded-xl border p-4 ${boxClass}`}>
      <div className="flex justify-between">
        {option.content}
        {label && <span className="ml-2 text-sm">{label}</span>}
      </div>
    </div>
  );
};

export default OptionCard;
