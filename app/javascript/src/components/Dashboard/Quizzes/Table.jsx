import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { NOTES_TABLE_COLUMN_DATA } from "./constants";

const Table = ({ selectedNoteIds, setSelectedNoteIds, quizzes = [] }) => (
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
export default Table;
