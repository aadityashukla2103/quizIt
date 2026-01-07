import React, { useState } from "react";

import quizzesApi from "apis/quizzes";
import InlineEdit from "components/commons/InlineEdit";
import { LeftArrow, ExternalLink, Link, Check } from "neetoicons";
import { Tab, Button, Tooltip } from "neetoui";
import { useHistory } from "react-router-dom";

const QuizHeader = ({
  quizName,
  quizId,
  lastSavedAt,
  status,
  reloadQuizData,
  questionCount,
  isQuestionBuilder,
}) => {
  const history = useHistory();
  const path = history.location.pathname;
  const [copied, setCopied] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  const onLeftArrowClick = () => {
    if (isQuestionBuilder) {
      history.goBack();
    } else {
      history.push("/quizzes");
    }
  };

  const handleQuizNameChange = async newName => {
    try {
      await quizzesApi.update(quizId, { quiz: { name: newName } });
      reloadQuizData();
    } catch (error) {
      logger.log(error);
    }
  };

  const onPublish = async () => {
    await quizzesApi.update(quizId, { quiz: { status: "published" } });
    setLocalStatus("published");
    reloadQuizData();
  };

  const onCopyLink = () => {
    const publicLink = `${window.location.origin}/publicdashboard/register/${quizId}`;
    navigator.clipboard.writeText(publicLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full border-b bg-white px-6 py-3">
      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center gap-3">
          <LeftArrow className="cursor-pointer" onClick={onLeftArrowClick} />
          <InlineEdit value={quizName} onSave={handleQuizNameChange} />
        </div>
        <div className="col-span-1 m-auto flex justify-center gap-4">
          <Tab noUnderline>
            <Tab.Item
              active={path.includes("questions")}
              onClick={() => history.push(`/quizzes/${quizId}/questions`)}
            >
              Questions
            </Tab.Item>
            <Tab.Item
              active={path.includes("submissions")}
              onClick={() => history.push(`/quizzes/${quizId}/submissions`)}
            >
              Submissions
            </Tab.Item>
            <Tab.Item
              active={path.includes("configure")}
              onClick={() => history.push(`/quizzes/${quizId}/configure`)}
            >
              Configure
            </Tab.Item>
          </Tab>
        </div>
        {!isQuestionBuilder && (
          <div className="flex items-center justify-end gap-4 text-xs text-gray-600">
            {localStatus === "draft" && lastSavedAt && (
              <p>Draft saved at {lastSavedAt}</p>
            )}
            {localStatus === "draft" && (
              <Button
                disabled={questionCount === 0}
                icon={ExternalLink}
                label="Publish"
                onClick={onPublish}
              />
            )}
            {localStatus === "published" && (
              <Tooltip content="Copy quiz link">
                <div className="cursor-pointer" onClick={onCopyLink}>
                  {copied ? <Check /> : <Link />}
                </div>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHeader;
