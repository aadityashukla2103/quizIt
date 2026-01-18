import React from "react";

import { useHistory } from "react-router-dom";

const ErrorPage = () => {
  const history = useHistory();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">404</h1>
        <p className="mt-2">Page not found</p>
        <button
          className="mt-4 inline-block text-blue-600 underline"
          type="button"
          onClick={() => history.goBack()}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
