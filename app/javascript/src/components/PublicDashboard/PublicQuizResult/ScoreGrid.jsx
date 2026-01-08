import React from "react";

const ScoreGrid = ({ submission }) => {
  const unansweredCount = submission.submission_answers.filter(
    ans => ans.selected_option === null
  ).length;

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="flex flex-col items-center rounded-xl bg-gray-100 p-4 shadow-sm">
        <p className="text-sm text-gray-600">Score</p>
        <p className="text-2xl font-bold">
          {submission.correct_answers}/{submission.total_questions}
        </p>
      </div>
      <div className="flex flex-col items-center rounded-xl bg-green-100 p-4 shadow-sm">
        <p className="text-sm text-green-700">Correct</p>
        <p className="text-2xl font-bold text-green-700">
          {submission.correct_answers}
        </p>
      </div>
      <div className="flex flex-col items-center rounded-xl bg-red-100 p-4 shadow-sm">
        <p className="text-sm text-red-600">Incorrect</p>
        <p className="text-2xl font-bold text-red-600">
          {submission.total_questions -
            submission.correct_answers -
            unansweredCount}
        </p>
      </div>
      <div className="flex flex-col items-center rounded-xl bg-gray-200 p-4 shadow-sm">
        <p className="text-sm text-gray-600">Unanswered</p>
        <p className="text-2xl font-bold text-gray-600">{unansweredCount}</p>
      </div>
    </div>
  );
};

export default ScoreGrid;
