import React, { useCallback, useRef, useState } from "react";

import NewSidebar from "./NewSidebar";
import OldSidebar from "./OldSidebar";

const SidebarWrapper = () => {
  const [activeSidebar, setActiveSidebar] = useState("old");
  const containerRef = useRef(null);

  const handleOldSidebarClick = useCallback(event => {
    const isLinkClick = event.target.closest("a, button");
    if (isLinkClick) return;
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
