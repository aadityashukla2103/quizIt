import React, { useState } from "react";

import quizzesApi from "apis/quizzes";
import { MenuVertical } from "neetoicons";
import {
  Table as NeetoUITable,
  Tag,
  ActionDropdown,
  Dropdown,
  Alert,
  Tooltip,
} from "neetoui";
import { Link } from "react-router-dom";

const { Menu, MenuItem } = ActionDropdown;
const { Button: MenuItemButton } = MenuItem;

const Table = ({
  quizzes = [],
  selectedQuizIds,
  setSelectedQuizIds,
  setQuizzes,
  currentPageNumber,
  defaultPageSize,
  handlePageChange,
  totalQuizCount,
  loading,
  visibleColumns,
}) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const handleStatusChange = async (id, status) => {
    try {
      await quizzesApi.update(id, { quiz: { status } });
      setQuizzes(prev => prev.map(q => (q.id === id ? { ...q, status } : q)));
    } catch (err) {
      logger.error(err);
    }
  };

  const handleDelete = async id => {
    try {
      await quizzesApi.destroy(id);
      setQuizzes(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      logger.error(err);
    }
  };

  const handleClone = async id => {
    try {
      const quiz = await quizzesApi.cloneQuiz(id);

      setQuizzes(prev => [
        {
          ...quiz,
          submission_count: 0,
        },
        ...prev,
      ]);
    } catch (err) {
      logger.error(err);
    }
  };

  const NOTES_TABLE_COLUMN_DATA = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      className: "text-center",
      render: (text, record) => (
        <Tooltip content={text}>
          <div className="mx-auto max-w-[200px] truncate">
            <Link
              className="text-blue-600 hover:underline"
              to={`/quizzes/${record.id}/questions`}
            >
              {text}
            </Link>
          </div>
        </Tooltip>
      ),
      ...(visibleColumns.name ? {} : { show: false }),
    },
    {
      title: "Submission Count",
      dataIndex: "submission_count",
      key: "submission_count",
      width: "15%",
      className: "text-center",
      render: text => <div className="text-center">{text}</div>,
      ...(visibleColumns.submissions ? {} : { show: false }),
    },
    {
      title: "Created On",
      dataIndex: "created_at",
      key: "created_at",
      width: "15%",
      className: "text-center",
      render: text => {
        const date = new Date(text);

        return (
          <div className="text-center">
            {date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </div>
        );
      },
      ...(visibleColumns.createdAt ? {} : { show: false }),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
      width: "15%",
      className: "text-center",
      render: text => <div className="text-center">{text}</div>,
      ...(visibleColumns.category ? {} : { show: false }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      className: "text-center",
      render: text => (
        <div className="text-center">
          <Tag style={text === "draft" ? "warning" : "info"}>
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </Tag>
        </div>
      ),
      ...(visibleColumns.status ? {} : { show: false }),
    },
    {
      title: "More Actions",
      key: "more_actions",
      width: "10%",
      className: "text-center",
      render: (_, record) => (
        <div className="flex justify-center">
          <Dropdown buttonStyle="text" icon={MenuVertical} strategy="fixed">
            <Menu>
              <MenuItemButton
                onClick={() =>
                  handleStatusChange(
                    record.id,
                    record.status === "draft" ? "published" : "draft"
                  )
                }
              >
                {record.status === "draft" ? "Publish" : "Unpublish"}
              </MenuItemButton>
              <MenuItemButton onClick={() => handleClone(record.id)}>
                Clone
              </MenuItemButton>
              <MenuItemButton
                onClick={() => {
                  setIsDeleteAlertOpen(true);
                  setSelectedQuizId(record.id);
                }}
              >
                Delete
              </MenuItemButton>
            </Menu>
          </Dropdown>
        </div>
      ),
    },
  ].filter(col => col.show !== false);

  return (
    <div className="w-full">
      <Alert
        isOpen={isDeleteAlertOpen}
        message="Are you sure you want to delete this quiz? This action cannot be undone."
        title="Delete Quiz"
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={() => {
          handleDelete(selectedQuizId);
          setIsDeleteAlertOpen(false);
        }}
      />
      <NeetoUITable
        rowSelection
        columnData={NOTES_TABLE_COLUMN_DATA}
        currentPageNumber={currentPageNumber}
        defaultPageSize={defaultPageSize}
        handlePageChange={handlePageChange}
        loading={loading}
        rowData={quizzes}
        selectedRowKeys={selectedQuizIds}
        totalCount={totalQuizCount}
        onRowSelect={setSelectedQuizIds}
      />
    </div>
  );
};

export default Table;
