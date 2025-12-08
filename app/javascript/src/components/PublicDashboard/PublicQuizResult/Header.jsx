import React from "react";

import { LeftArrow } from "neetoicons";

const Header = ({ totalQuestions, goBack }) => (
  <div className="mb-8 flex items-center justify-between">
    <button
      className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      onClick={goBack}
    >
      <LeftArrow size={20} />
      Back to home
    </button>
    <p className="text-lg font-medium text-gray-700">
      Total: {totalQuestions} Questions
    </p>
  </div>
);

export default Header;
