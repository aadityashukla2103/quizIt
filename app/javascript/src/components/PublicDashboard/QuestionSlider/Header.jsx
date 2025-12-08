import React from "react";

import { Header as NeetoUiHeader } from "neetoui/layouts";

const Header = ({ currentIndex, totalQuestions }) => (
  <div>
    <NeetoUiHeader title="Quiz Questions" />
    <p className=" text-gray-500">
      Question {currentIndex + 1} of {totalQuestions}
    </p>
  </div>
);

export default Header;
