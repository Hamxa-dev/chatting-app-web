
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="home"
      style={{
        //  position: "fixed",
        top: 0,
        left: 0,
        background: "linear-gradient(45deg, #f0f0f0 50%, #5d5b8d 50%)",
      }}
    >
      <div className="container">
        {/* Sidebar Toggle Button */}
        <div
          className={`hamburger-icon ${isSidebarOpen ? "open" : "closed"}`}
          onClick={toggleSidebar}
          style={{
            backgroundColor: "transparent",
            paddingTop: "24px",
            color: "lightgray",
            padding: "1%",
          }} 
        >
          {isSidebarOpen ? (
            <CloseIcon style={{ width: "24px", height: "24px" }} />
          ) : (
            <MoreVertIcon style={{ width: "24px", height: "24px" }} />
          )}
        </div>

        {/* Sidebar */}
        <div ref={sidebarRef}>{isSidebarOpen && <Sidebar />}</div>

        {/* Chat */}
        <Chat />
      </div>
    </div>
  );
};

export default Home;
