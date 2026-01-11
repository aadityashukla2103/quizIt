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
  Typography,
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
  const [selectedQuizSlug, setSelectedQuizSlug] = useState("");
  const [selectedQuizName, setSelectedQuizName] = useState("");

  const handleStatusChange = async (slug, status) => {
    try {
      await quizzesApi.update(slug, { quiz: { status } });
      setQuizzes(prev =>
        prev.map(q => (q.slug === slug ? { ...q, status } : q))
      );
    } catch (err) {
      logger.error(err);
    }
  };

  const handleDelete = async slug => {
    try {
      await quizzesApi.destroy(slug);
      setQuizzes(prev => prev.filter(q => q.slug !== slug));
      setSelectedQuizIds([]);
    } catch (err) {
      logger.error(err);
    }
  };

  const handleClone = async slug => {
    try {
      const quiz = await quizzesApi.cloneQuiz(slug);
      setQuizzes(prev => [{ ...quiz, submission_count: 0 }, ...prev]);
      setSelectedQuizIds([]);
    } catch (err) {
      logger.error(err);
    }
  };

  const QUIZZES_TABLE_COLUMN_DATA = [
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
              to={`/quizzes/${record.slug}/questions`}
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
                    record.slug,
                    record.status === "draft" ? "published" : "draft"
                  )
                }
              >
                {record.status === "draft" ? "Publish" : "Unpublish"}
              </MenuItemButton>
              <MenuItemButton onClick={() => handleClone(record.slug)}>
                Clone
              </MenuItemButton>
              <MenuItemButton
                onClick={() => {
                  setIsDeleteAlertOpen(true);
                  setSelectedQuizSlug(record.slug);
                  setSelectedQuizName(record.name);
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
        title="Delete Quiz"
        message={
          <Typography style="body2">
            Are you sure you want to delete{" "}
            <Typography as="span" className="inline" style="h5">
              "{selectedQuizName}"
            </Typography>
            ? This action cannot be undone.
          </Typography>
        }
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={() => {
          handleDelete(selectedQuizSlug);
          setIsDeleteAlertOpen(false);
        }}
      />
      <NeetoUITable
        rowSelection
        columnData={QUIZZES_TABLE_COLUMN_DATA}
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

export default React.memo(Table);
