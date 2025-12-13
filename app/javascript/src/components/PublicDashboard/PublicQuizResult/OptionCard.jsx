import React from "react";

const OptionCard = ({ option, selectedOptionId }) => {
  const isCorrect = option.is_correct;
  const isSelected = option.id === selectedOptionId;
  const isUnanswered = selectedOptionId === null;

  let boxClass = "border-gray-300 bg-white";
  let label = null;

  if (isUnanswered && isCorrect) {
    boxClass = "border-green-500 bg-green-50";
    label = "✓ Correct Answer";
  }

  if (!isUnanswered) {
    if (isSelected && isCorrect) {
      boxClass = "border-green-600";
      label = "✓ Your Answer (Correct)";
    } else if (isSelected && !isCorrect) {
      boxClass = "border-red-500";
      label = "✗ Your Answer";
    } else if (!isSelected && isCorrect) {
      boxClass = "border-green-500";
      label = "✓ Correct Answer";
    }
  }

  return (
    <div className={`rounded-xl border p-4 ${boxClass}`}>
      <div className="flex items-center justify-between">
        <span>{option.content}</span>
        {label && <span className="text-sm font-medium">{label}</span>}
      </div>
    </div>
  );
};

export default OptionCard;
