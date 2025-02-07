import React, { useEffect, useState } from "react";

import "./MainChat.scss";
import ChatHeader from "./ChatHeader";
import Massage from "./Massage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppSelector } from "../app/hooks";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: null | {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

function MainChat() {
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const [massages, setMassages] = useState<Messages[]>([]);
  const user = useAppSelector((state) => state.user.user);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    const q = query(
      collection(db, "channels", String(channelId), "messages"),
      orderBy("timestamp", "asc")
    );
    onSnapshot(q, (querySnapshot) => {
      const massages: Messages[] = [];
      querySnapshot.forEach((doc) => {
        massages.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setMassages(massages);
    });
  }, [channelId]);

  const sendInputText = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await addDoc(collection(db, "channels", String(channelId), "messages"), {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
    setInputText("");
  };

  return (
    <div className="mainchat">
      <ChatHeader channelName={channelName} />
      <div className="chatmessage">
        {massages.map((message, index) => (
          <Massage
            key={index}
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>
      <div className="chatinput">
        <AddCircleOutlineIcon />
        <form>
          <input
            type="text"
            placeholder="メッセージを入力してください。"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            value={inputText}
          ></input>
          <button
            type="submit"
            className="inputbutton"
            onClick={(e) => sendInputText(e)}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainChat;
