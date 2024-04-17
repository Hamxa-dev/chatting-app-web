import React, { useContext } from "react";

import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  

  return (
    <div className="chat">
      <div className="chatInfo">
        <div
          className="userInfo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={data.user?.photoURL}
            alt=""
            className="userAvatar"
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
          <span
            className="userName"
            style={{ fontWeight: "bold", fontSize: "20px", marginLeft: "10px" }}
          >
            {data.user?.displayName}
          </span>
        </div>
        <div className="chatIcons">
          <img
            src="https://play-lh.googleusercontent.com/JRZn6KdzogK3SaavPNmkHHRVgQ7Jm59OisHAnf9j3Wr8kfQEKscj0Qj5K_0OrGxDe_w=w600-h300-pc0xffffff-pd"
            alt="Profile"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              objectFit: "cover",
              
            }}
          />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
