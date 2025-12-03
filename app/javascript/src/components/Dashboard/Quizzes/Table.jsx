import React from "react";

import { Table as NeetoUITable, Tag } from "neetoui";
import { Link } from "react-router-dom";

const Table = ({ selectedNoteIds, setSelectedNoteIds, quizzes = [] }) => {
  const NOTES_TABLE_COLUMN_DATA = [
    {
      title: "Quiz Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (text, record) => (
        <Link
          className="text-blue-600 hover:underline"
          to={`/quizzes/${record.id}/questions`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
      width: "30%",
      render: text => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
    },
    {
      title: "Submissions",
      dataIndex: "submission_count",
      key: "submission_count",
      width: "20%",
    },
  ];

  return (
    <div className="w-full">
      <NeetoUITable
        rowSelection
        columnData={NOTES_TABLE_COLUMN_DATA}
        rowData={quizzes}
        selectedRowKeys={selectedNoteIds}
        onRowSelect={selectedRowKeys => setSelectedNoteIds(selectedRowKeys)}
      />
    </div>
  );
};

export default Table;
