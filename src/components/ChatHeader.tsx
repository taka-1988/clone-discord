import React from "react";

import "./ChatHeader.scss";

type Props = {
  channelName: string | null;
};

function ChatHeader(props: Props) {
  const { channelName } = props;
  return (
    <div className="chatheader">
      <h3>
        #<span>{channelName}</span>
      </h3>
    </div>
  );
}

export default ChatHeader;
