import React from "react";

import { Callout } from "neetoui";

const CalloutMessage = ({ currentAnswer }) => {
  const isUnanswered = currentAnswer.selected_option === null;
  const isUnvisited = currentAnswer.attempted === false;
  const isCorrect = currentAnswer.is_correct === true;

  let calloutMessage = "";
  let calloutStyle = "info";

  if (isUnvisited) {
    calloutMessage = "🚫 You did not attempt this question.";
    calloutStyle = "info";
  } else if (isUnanswered) {
    calloutMessage = "⚠️ You did not answer this question.";
    calloutStyle = "info";
  } else if (isCorrect) {
    calloutMessage = "🎉 Your answer is correct!";
    calloutStyle = "success";
  } else {
    calloutMessage = "❌ Your answer is incorrect.";
    calloutStyle = "danger";
  }

  return (
    <div className="mb-6">
      <Callout style={calloutStyle}>{calloutMessage}</Callout>
    </div>
  );
};

export default CalloutMessage;
