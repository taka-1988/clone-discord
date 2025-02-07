import React, { useEffect, useId } from "react";
import Sidebar from "./components/Sidebar";
import MainChat from "./components/MainChat";
import Login from "./components/Login";

import "./App.scss";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";

function App() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <MainChat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
