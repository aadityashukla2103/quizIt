import React, { useState } from "react";

import redirectionsApi from "apis/redirections";
import { MenuHorizontal, Check, Close } from "neetoicons";
import {
  Input,
  Dropdown,
  ActionDropdown,
  Alert,
  Tooltip,
  PageLoader,
} from "neetoui";

const { Menu } = ActionDropdown;
const { Button: MenuItemButton } = ActionDropdown.MenuItem;

const RedirectionsInput = ({
  redirection,
  isNew,
  onDelete,
  onCreate,
  onRemoveTemp,
}) => {
  const [isEditing, setIsEditing] = useState(isNew);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fromPath, setFromPath] = useState(redirection.from_path || "");
  const [toPath, setToPath] = useState(redirection.to_path || "");

  const handleSave = async () => {
    if (!fromPath.trim() || !toPath.trim()) return;

    setLoading(true);

    if (isNew) {
      const res = await redirectionsApi.create({
        from_path: fromPath,
        to_path: toPath,
      });
      onCreate(res.redirection);
    } else {
      await redirectionsApi.update(redirection.id, {
        from_path: fromPath,
        to_path: toPath,
      });
    }

    setLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const isEmpty = fromPath.trim() === "" && toPath.trim() === "";

    if (isNew && isEmpty) {
      onRemoveTemp();

      return;
    }

    setFromPath(redirection.from_path);
    setToPath(redirection.to_path);
    setIsEditing(false);
  };

  const deleteRedirection = async () => {
    setLoading(true);
    await redirectionsApi.destroy(redirection.id);
    setLoading(false);
    setIsDeleteAlertOpen(false);
    onDelete(redirection.id);
  };

  if (loading) {
    return (
      <div className="m-auto flex h-screen items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  const commonInputStyles = `rounded-md border bg-white px-3 py-2 font-semibold transition
    focus:border-gray-400`;
  const viewModeStyles = `border-transparent bg-gray-50 overflow-hidden truncate whitespace-nowrap`;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3 shadow-md">
      <Alert
        isOpen={isDeleteAlertOpen}
        message={`Are you sure you want to delete "${fromPath}" to "${toPath}"?`}
        title="Delete redirection"
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={deleteRedirection}
      />
      <div className="flex flex-1 items-center gap-2">
        <div className="h-9 w-1 rounded-full bg-sky-500" />
        <div className="w-full">
          <Tooltip content={fromPath} position="top">
            <Input
              nakedInput
              placeholder="Enter from path"
              readOnly={!isEditing}
              value={fromPath}
              className={`${commonInputStyles} ${
                isEditing ? "border-gray-200" : viewModeStyles
              }`}
              onChange={e => setFromPath(e.target.value)}
            />
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-1 items-center gap-2">
        <div className="h-9 w-1 rounded-full bg-emerald-500" />
        <div className="w-full">
          <Tooltip content={toPath} position="top">
            <Input
              nakedInput
              placeholder="Enter to path"
              readOnly={!isEditing}
              value={toPath}
              className={`${commonInputStyles} ${
                isEditing ? "border-gray-200" : viewModeStyles
              }`}
              onChange={e => setToPath(e.target.value)}
            />
          </Tooltip>
        </div>
      </div>
      {isEditing ? (
        <div className="flex gap-2">
          <Check className="cursor-pointer" color="gray" onClick={handleSave} />
          <Close
            className="cursor-pointer"
            color="red"
            onClick={handleCancel}
          />
        </div>
      ) : (
        <Dropdown buttonStyle="text" icon={MenuHorizontal}>
          <Menu>
            <MenuItemButton onClick={() => setIsEditing(true)}>
              Edit
            </MenuItemButton>
            <MenuItemButton
              style="danger"
              onClick={() => setIsDeleteAlertOpen(true)}
            >
              Delete
            </MenuItemButton>
          </Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default RedirectionsInput;
