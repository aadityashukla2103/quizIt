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

  const baseUrl = window.location.origin;

  const normalizeFromPath = value => {
    const v = (value || "").trim();
    if (!v) return "";

    if (v.startsWith("http://") || v.startsWith("https://")) {
      try {
        return new URL(v).pathname || "/";
      } catch {
        return v.startsWith("/") ? v : `/${v}`;
      }
    }

    return v.startsWith("/") ? v : `/${v}`;
  };

  const normalizeToPath = value => {
    const v = (value || "").trim();
    if (!v) return "";

    if (v.startsWith("http://") || v.startsWith("https://")) return v;

    return v.startsWith("/") ? v : `/${v}`;
  };

  const buildFullUrl = value => {
    const v = (value || "").trim();
    if (!v) return "";

    if (v.startsWith("http://") || v.startsWith("https://")) return v;

    const path = v.startsWith("/") ? v : `/${v}`;

    return `${baseUrl}${path}`;
  };

  const splitUrlParts = value => {
    const v = (value || "").trim();
    if (!v) return { host: "", path: "" };

    if (v.startsWith("http://") || v.startsWith("https://")) {
      try {
        const url = new URL(v);

        return {
          host: url.origin,
          path: `${url.pathname}${url.search}${url.hash}`,
        };
      } catch {
        return { host: "", path: v };
      }
    }

    const path = v.startsWith("/") ? v : `/${v}`;

    return { host: baseUrl, path };
  };

  const handleSave = async () => {
    if (!fromPath.trim() || !toPath.trim()) return;

    setLoading(true);

    const payload = {
      from_path: normalizeFromPath(fromPath),
      to_path: normalizeToPath(toPath),
    };

    if (isNew) {
      const res = await redirectionsApi.create(payload);
      onCreate(res.redirection);
    } else {
      await redirectionsApi.update(redirection.id, payload);
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

  const commonBoxStyles =
    "rounded-md border bg-white px-3 py-2 transition focus:border-gray-400";

  const viewModeStyles =
    "border-transparent bg-gray-50 overflow-hidden truncate whitespace-nowrap";

  const fromParts = splitUrlParts(fromPath);
  const toParts = splitUrlParts(toPath);

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3 shadow-md">
      <Alert
        isOpen={isDeleteAlertOpen}
        title="Delete redirection"
        message={`Are you sure you want to delete "${buildFullUrl(
          normalizeFromPath(fromPath)
        )}" to "${buildFullUrl(normalizeToPath(toPath))}"?`}
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={deleteRedirection}
      />
      <div className="flex flex-1 items-center gap-2">
        <div className="h-9 w-1 rounded-full bg-sky-500" />
        <div className="w-[420px]">
          {isEditing ? (
            <Input
              nakedInput
              className={`${commonBoxStyles} border-gray-200 font-semibold`}
              placeholder="Enter from path"
              value={fromPath}
              onChange={e => setFromPath(e.target.value)}
            />
          ) : (
            <Tooltip content={buildFullUrl(fromPath)} position="top">
              <div
                className={`${commonBoxStyles} ${viewModeStyles} flex min-w-0 font-mono`}
              >
                <span className="shrink-0 font-normal text-gray-500">
                  {fromParts.host}
                </span>
                <span className="min-w-0 truncate font-semibold text-gray-900">
                  {fromParts.path}
                </span>
              </div>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="flex flex-1 items-center gap-2">
        <div className="h-9 w-1 rounded-full bg-emerald-500" />
        <div className="w-[420px]">
          {isEditing ? (
            <Input
              nakedInput
              className={`${commonBoxStyles} border-gray-200 font-semibold`}
              placeholder="Enter to path"
              value={toPath}
              onChange={e => setToPath(e.target.value)}
            />
          ) : (
            <Tooltip content={buildFullUrl(toPath)} position="top">
              <div
                className={`${commonBoxStyles} ${viewModeStyles} flex min-w-0 font-serif`}
              >
                <span className="shrink-0 font-normal text-gray-500">
                  {toParts.host}
                </span>
                <span className="min-w-0 truncate font-semibold text-gray-900">
                  {toParts.path}
                </span>
              </div>
            </Tooltip>
          )}
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
