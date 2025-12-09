// @ts-nocheck
import React, { useCallback, useRef, useState } from "react";

// eslint-disable-next-line import/extensions
import NewSidebar from "./NewSidebar.jsx";
// eslint-disable-next-line import/extensions
import OldSidebar from "./OldSidebar.jsx";

// Switch to the new sidebar when the old sidebar itself is clicked (but not its links).
const SidebarWrapper = () => {
  const [activeSidebar, setActiveSidebar] = useState("old");
  const containerRef = useRef(null);

  const handleOldSidebarClick = useCallback(event => {
    const isLinkClick = event.target.closest("a, button");
    if (isLinkClick) return; // keep normal nav clicks unchanged
    setActiveSidebar("new");
  }, []);

  const handleCloseNewSidebar = useCallback(() => {
    setActiveSidebar("old");
  }, []);

  return (
    <div className="relative flex min-h-screen" ref={containerRef}>
      {activeSidebar === "old" && (
        <div className="h-full" onClick={handleOldSidebarClick}>
          <OldSidebar />
        </div>
      )}
      {activeSidebar === "new" && (
        <div className="relative z-10 h-full">
          <NewSidebar onClose={handleCloseNewSidebar} />
        </div>
      )}
    </div>
  );
};

export default React.memo(SidebarWrapper);
