import React, { useState, useRef, useEffect, useCallback } from "react";

import userApi from "apis/users";
import { createPortal } from "react-dom";

import OldSidebar from "./CollapseSidebar";
import NewSidebar from "./ExpandedSidebar";

const SidebarWrapper = () => {
  const [isNewSidebarOpen, setIsNewSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const newSidebarRef = useRef(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await userApi.fetchCurrentUser();
        setCurrentUser(data);
      } catch (err) {
        logger.error("Error fetching current user:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        newSidebarRef.current &&
        !newSidebarRef.current.contains(event.target)
      ) {
        setIsNewSidebarOpen(false);
      }
    };

    if (isNewSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNewSidebarOpen]);

  const handleOldSidebarClick = useCallback(event => {
    const isLinkClick = event.target.closest("a, button");
    if (!isLinkClick) {
      setIsNewSidebarOpen(true);
    }
  }, []);

  const portalContent = (
    <>
      {isNewSidebarOpen && (
        <div
          className="fixed inset-0 z-[99998] bg-black bg-opacity-20"
          onClick={() => setIsNewSidebarOpen(false)}
        />
      )}
      <div
        ref={newSidebarRef}
        className={`fixed left-0 top-0 z-[99999] h-full shadow-lg transition-transform duration-300 ease-in-out ${
          isNewSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NewSidebar
          currentUser={currentUser}
          onClose={() => setIsNewSidebarOpen(false)}
        />
      </div>
    </>
  );

  return (
    <>
      <div
        className="relative h-full flex-shrink-0"
        onClick={handleOldSidebarClick}
      >
        <OldSidebar currentUser={currentUser} />
        <button
          aria-label={isNewSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="absolute right-0 top-4 rounded-l p-2 text-white transition-transform duration-300 hover:bg-blue-700"
          onClick={() => setIsNewSidebarOpen(prev => !prev)}
        />
      </div>
      {createPortal(portalContent, document.body)}
    </>
  );
};

export default React.memo(SidebarWrapper);
