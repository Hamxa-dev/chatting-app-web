import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo"></span>
      <div className="user">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={currentUser.photoURL}
            alt=""
            style={{ width: "40px", height: "40px" }}
          />
          <span style={{ fontWeight: "bold",paddingLeft:"18px" }}>{currentUser.displayName}</span>
        </div>

        <button
          onClick={() => signOut(auth)}
          style={{
            backgroundColor: "#5d5b8d",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "5px",
            padding: "8px 16px",
            cursor: "pointer",
            marginLeft: "10px",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
