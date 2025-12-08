import React from "react";

import { Callout } from "neetoui";

const CalloutMessage = ({ currentAnswer }) => {
  const isUnanswered = currentAnswer.selected_option_id === null;
  const isCorrect = currentAnswer.is_correct === true;
  const isWrong = currentAnswer.is_correct === false && !isUnanswered;

  let calloutMessage = "";
  let calloutStyle = "info";

  if (isUnanswered) {
    calloutMessage = "You did not answer this question.";
    calloutStyle = "info";
  } else if (isCorrect) {
    calloutMessage = "🎉 Your answer is correct!";
    calloutStyle = "success";
  } else if (isWrong) {
    calloutMessage = "❌ Your answer is incorrect.";
    calloutStyle = "danger";
  }

  return (
    <div className="mt-0">
      <Callout style={calloutStyle}>{calloutMessage}</Callout>
    </div>
  );
};

export default CalloutMessage;
