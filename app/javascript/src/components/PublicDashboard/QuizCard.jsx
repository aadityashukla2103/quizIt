import React from "react";

import { Button, Tag } from "neetoui";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => (
  <div className="flex h-56 flex-col justify-between rounded-lg border bg-white p-6 shadow-sm">
    <div>
      <h3 className="mb-1 line-clamp-2 text-lg font-semibold">{quiz.name}</h3>
      <Tag size="large" style="info">
        {quiz.category_name}
      </Tag>
    </div>
    <div>
      <span className="mb-2 block text-sm text-gray-600">
        {quiz.question_count} Questions
      </span>
      <Link className="block" to={`/publicdashboard/register/${quiz.slug}`}>
        <Button
          className="w-full"
          label="Start Quiz"
          size="large"
          style="primary"
        />
      </Link>
    </div>
  </div>
);

export default QuizCard;
