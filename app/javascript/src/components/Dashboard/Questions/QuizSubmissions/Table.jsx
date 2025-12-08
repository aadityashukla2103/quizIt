import React from "react";

import { Table as NeetoUITable, Tag } from "neetoui";
import { Link } from "react-router-dom";

const Table = ({ Submissions = [], visibleColumns }) => {
  const allColumns = [
    {
      title: "Name",
      dataIndex: "guest_name",
      key: "guest_name",
      width: "20%",
      render: (text, record) =>
        record.status === "completed" ? (
          <Link
            className="text-blue-600 hover:underline"
            to={`/public/quizzes/${record.quiz_id}/submissions/${record.id}/result`}
          >
            {text}
          </Link>
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Email",
      dataIndex: "guest_email",
      key: "guest_email",
      width: "20%",
    },
    {
      title: "Submission Date",
      dataIndex: "submitted_at",
      key: "submitted_at",
      width: "15%",
      render: text => new Date(text).toLocaleString(),
    },
    {
      title: "Correct",
      dataIndex: "correct_answers",
      key: "correct_answers",
      width: "10%",
    },
    {
      title: "Wrong",
      dataIndex: "wrong_answers",
      key: "wrong_answers",
      width: "10%",
    },
    {
      title: "Unanswered",
      dataIndex: "total_questions",
      key: "unanswered",
      width: "10%",
      render: (_, record) =>
        record.total_questions -
        (record.correct_answers + record.wrong_answers),
    },
    {
      title: "Total Questions",
      dataIndex: "total_questions",
      key: "total_questions",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "5%",
      render: text => (
        <Tag style={text === "completed" ? "info" : "warning"}>{text}</Tag>
      ),
    },
  ];

  const filteredColumns = allColumns.filter(col => visibleColumns[col.key]);

  return (
    <div className="w-full">
      <NeetoUITable columnData={filteredColumns} rowData={Submissions} />
    </div>
  );
};

export default Table;
