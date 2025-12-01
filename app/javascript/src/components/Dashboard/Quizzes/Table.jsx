import React, { useState } from "react";

import { Table as NeetoUITable } from "neetoui";

import { NOTES_TABLE_COLUMN_DATA } from "./constants";
import EditNotePane from "./Pane/Edit";

const Table = ({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
  fetchNotes,
}) => {
  const [showEditNote, setShowEditNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  // const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //     width: 75,
  //     sorter: (a, b) => a.id - b.id,
  //   },
  //   {
  //     title: "GUID",
  //     dataIndex: "guid",
  //     key: "guid",
  //     width: 150,
  //     ellipsis: {
  //       showTitle: false,
  //     },
  //   },
  //   {
  //     title: "First Name",
  //     dataIndex: "first_name",
  //     key: "first_name",
  //     width: 150,
  //   },
  //   {
  //     title: "Last Name",
  //     dataIndex: "last_name",
  //     key: "last_name",
  //     width: 150,
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //     key: "email",
  //     width: 200,
  //     ellipsis: {
  //       showTitle: false,
  //     },
  //   },
  //   {
  //     title: "Company Name",
  //     dataIndex: "company_name",
  //     key: "company_name",
  //     ellipsis: {
  //       showTitle: false,
  //     },
  //     width: 75,
  //   },
  // ];

  return (
    <>
      <div className="notes-table-height w-full">
        <NeetoUITable
          allowRowClick
          rowSelection
          columnData={NOTES_TABLE_COLUMN_DATA}
          rowData={notes}
          selectedRowKeys={selectedNoteIds}
          onRowSelect={selectedRowKeys => setSelectedNoteIds(selectedRowKeys)}
          onRowClick={(_, note) => {
            setSelectedNote(note);
            setShowEditNote(true);
          }}
        />
        <div className="mx-auto mt-10 w-2/3">
          {/* <NeetoUITable
            columnData={NOTES_TABLE_COLUMN_DATA}
          /> */}
        </div>
      </div>
      <EditNotePane
        fetchNotes={fetchNotes}
        note={selectedNote}
        setShowPane={setShowEditNote}
        showPane={showEditNote}
      />
    </>
  );
};

export default Table;
