import React, { useEffect, useState } from "react";

import redirectionsApi from "apis/redirections";
import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

import RedirectionsInput from "./RedirectionInputs";

import SettingsHeader from "../SettingsHeader";

const Redirections = () => {
  const [redirections, setRedirections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRedirections = async () => {
    const res = await redirectionsApi.fetch();
    setRedirections(res.redirections);
    setLoading(false);
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  const handleDelete = id => {
    setRedirections(prev => prev.filter(item => item.id !== id));
  };

  const hasOpenNewRedirection = redirections.some(item => item.isNew);

  const handleAddRedirection = () => {
    if (hasOpenNewRedirection) return;

    setRedirections(prev => [
      ...prev,
      {
        from_path: "",
        to_path: "",
        isNew: true,
      },
    ]);
  };

  const handleCreate = (tempItem, createdItem) => {
    setRedirections(prev =>
      prev.map(item => (item === tempItem ? createdItem : item))
    );
  };

  const handleRemoveTemp = tempItem => {
    setRedirections(prev => prev.filter(item => item !== tempItem));
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <SettingsHeader />
      <div className="m-8 flex flex-1 flex-col overflow-hidden">
        <div className="mb-6">
          <Typography style="h1">Redirections</Typography>
          <Typography className="text-gray-500" style="h4">
            Create and configure redirection rules to send users from old public
            quiz links to new public quiz link.
          </Typography>
        </div>
        <div className="mb-2 flex items-start justify-around px-4">
          <Typography className="text-gray-500" style="h4">
            From
          </Typography>
          <Typography className="text-gray-500" style="h4">
            To
          </Typography>
        </div>
        <div className="flex max-h-[500px] flex-col gap-2 overflow-y-auto">
          {loading && (
            <Typography className="text-gray-400">
              Loading redirections...
            </Typography>
          )}
          {!loading &&
            redirections.map((redirection, index) => (
              <RedirectionsInput
                isNew={redirection.isNew}
                key={redirection.id ?? `new-${index}`}
                redirection={redirection}
                onCreate={created => handleCreate(redirection, created)}
                onDelete={handleDelete}
                onRemoveTemp={() => handleRemoveTemp(redirection)}
              />
            ))}
        </div>
        <div className="mt-4">
          <Button
            disabled={hasOpenNewRedirection}
            icon={Plus}
            iconPosition="left"
            label="Add redirection"
            size="medium"
            style="secondary"
            onClick={handleAddRedirection}
          />
        </div>
      </div>
    </div>
  );
};

export default Redirections;
