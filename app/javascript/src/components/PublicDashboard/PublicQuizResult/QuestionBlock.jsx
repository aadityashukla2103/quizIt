import React from "react";

import OptionCard from "./OptionCard";

const QuestionBlock = ({ currentAnswer }) => (
  <div className="mt-10">
    <h2 className="mb-6 text-xl font-semibold">
      {currentAnswer.question.content}
    </h2>
    <div className="space-y-6">
      {currentAnswer.question.options.map(option => (
        <OptionCard
          key={option.id}
          option={option}
          selectedOptionId={currentAnswer.selected_option?.id}
        />
      ))}
    </div>
  </div>
);

export default QuestionBlock;
