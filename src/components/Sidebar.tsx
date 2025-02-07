import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from "./SidebarChannel";

import "./Sidebar.scss";
import { auth, db } from "../firebase";
import { useAppSelector } from "../app/hooks";
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  query,
} from "firebase/firestore";

interface Channels {
  id: string;
  channel: DocumentData;
}

function Sidebar() {
  const user = useAppSelector((state) => state.user.user);
  const [channels, setChannels] = useState<Channels[]>([]);

  const SinOut = () => {
    auth.signOut();
  };

  const AddChannel = async () => {
    let channelName: string | null = prompt(
      "新しいチャンネル名を入力してください。"
    );

    if (channelName) {
      await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
    }
  };

  useEffect(() => {
    const q = query(collection(db, "channels"));
    onSnapshot(q, (querySnapshot) => {
      const channels: Channels[] = [];
      querySnapshot.forEach((doc) => {
        channels.push({
          id: doc.id,
          channel: doc.data(),
        });
      });
      setChannels(channels);
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="account">
        <img src={user?.photo} alt="accounticon" onClick={() => SinOut()} />
        <div className="userinfo">
          <h4>
            @<span>{user?.displayName}</span>
          </h4>
          <p>{user?.uid.substring(0, 4)}</p>
        </div>
      </div>
      <div className="channel">
        <div className="channelheader">
          <div className="channelicon">
            <ExpandMoreIcon />
            <h3>チャンネルリスト</h3>
          </div>
          <AddIcon className="sidebaraddicon" onClick={() => AddChannel()} />
        </div>
        <div className="channellist">
          {channels.map((channel) => (
            <SidebarChannel
              key={channel.id}
              channel={channel.channel}
              id={channel.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
