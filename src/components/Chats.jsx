import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // Function to split text into chunks of maximum 15 words
  const splitTextIntoChunks = (text) => {
    if (!text) return []; // Check if text is undefined or null
    const words = text.split(" ");
    const chunks = [];
    for (let i = 0; i < words.length; i += 15) {
      chunks.push(words.slice(i, i + 3).join(" "));
    }
    return chunks;
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            {/* Render each chunk of last message text in a separate paragraph */}
            {splitTextIntoChunks(chat[1].lastMessage?.text).map((chunk, index) => (
              <p key={index}>{chunk}...</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
