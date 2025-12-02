import React, { useState, useRef, useEffect } from "react";

import NewSidebar from "./NewSidebar";
import OldSidebar from "./OldSidebar";

const SIDEBAR_TRIGGERS = ["Notes", "Settings", "Explore"];

const SidebarWrapper = () => {
  const [activeSidebar, setActiveSidebar] = useState("old");
  const wrapperRef = useRef();

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setActiveSidebar("old");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = label => {
    if (SIDEBAR_TRIGGERS.includes(label)) {
      setActiveSidebar("new");
    } else {
      setActiveSidebar("old");
    }
  };

  return (
    <div className="flex">
      <div style={{ display: activeSidebar === "old" ? "block" : "none" }}>
        <OldSidebar onNavClick={handleNavClick} />
      </div>
      <div
        ref={wrapperRef}
        style={{ display: activeSidebar === "new" ? "block" : "none" }}
      >
        <NewSidebar onNavClick={handleNavClick} />
      </div>
    </div>
  );
};

export default React.memo(SidebarWrapper);
