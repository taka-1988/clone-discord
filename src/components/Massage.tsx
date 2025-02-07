import React from "react";

import "./Massage.scss";
import { Timestamp } from "firebase/firestore";

type Props = {
  timestamp: Timestamp;
  message: string;
  user: null | {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

function Massage(props: Props) {
  const { timestamp, message, user } = props;
  return (
    <div className="massage">
      <div className="useraccount">
        <div className="usericon">
          <img src={user?.photo} alt="usericon" />
        </div>
        <div>
          <p className="massage">{message}</p>
          <div className="user">
            <h4>
              @<span>{user?.displayName}</span>
            </h4>
            <p className="timestamp">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Massage;
