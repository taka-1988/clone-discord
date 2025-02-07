import React from "react";

import "./SidebarChannel.scss";
import { DocumentData } from "firebase/firestore";
import { useAppDispatch } from "../app/hooks";
import { setChannelInfo } from "../features/channelSlice";

type Props = {
  id: string;
  channel: DocumentData;
};

function SidebarChannel(props: Props) {
  const { id, channel } = props;
  const dispatch = useAppDispatch();

  return (
    <div
      className="sidebarchannel"
      onClick={() => {
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channel.channelName,
          })
        );
      }}
    >
      <h4>
        #<span>{channel.channelName}</span>
      </h4>
    </div>
  );
}

export default SidebarChannel;
