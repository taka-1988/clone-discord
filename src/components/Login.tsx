import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";

import "./Login.scss";
import { auth, provider } from "../firebase";

function Login() {
  const Login = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.log(error.message);
    });
  };

  return (
    <div className="login">
      <img src="./knz90j3g.png" alt="logo" />
      <Button
        className="loginbutton"
        variant="contained"
        onClick={() => Login()}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
