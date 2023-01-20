import "./Auth.styles.css";
import { useState, useCallback, useEffect } from "react";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

const Auth = () => {
  const [displaySignIn, setDisplaySignIn] = useState(false);
  const handleChangeDisplay = useCallback(() => {
    setDisplaySignIn(!displaySignIn);
  }, [displaySignIn, setDisplaySignIn]);

  return (
    <div>
      {displaySignIn ? (
        <SignIn switchView={handleChangeDisplay} />
      ) : (
        <SignUp switchView={handleChangeDisplay} />
      )}
    </div>
  );
};

export default Auth;
