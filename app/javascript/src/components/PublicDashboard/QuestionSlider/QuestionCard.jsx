import React from "react";

const QuestionCard = ({ question, selectedOption, onSelect }) => (
  <div className="mt-10">
    <h2 className="mb-6 text-xl font-semibold text-gray-900">
      {question.content}
    </h2>
    <div className="space-y-4">
      {question.options.map(option => (
        <div
          key={option.id}
          className={`cursor-pointer rounded-xl border p-4 transition ${
            selectedOption?.id === option.id
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => onSelect(option)}
        >
          {option.content}
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
