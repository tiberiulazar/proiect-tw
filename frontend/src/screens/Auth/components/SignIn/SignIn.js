import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import { useDispatch } from "react-redux";
import { addUser } from "../../../../store/slices/userSlice";

const SignIn = ({ switchView }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = useCallback(async () => {
    if (!email) {
      toast.error("You forgot to enter your email");
      return;
    }
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      toast.error("Your email format is wrong");
      return;
    }
    if (!password) {
      toast.error("You forgot to enter your password");
      return;
    }
    if (password.length < 8) {
      toast.error("Your password must be at least 8 characters long");
      return;
    }

    const userBody = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userBody),
      });

      if (!response.ok) {
        throw response;
      }

      const userData = await response.json();
      toast.success(userData?.message);
      dispatch(addUser(userData?.data));
      console.log(userData);
    } catch (err) {
      console.warn(err);
      toast.error(err?.statusText);
    }
  }, [email, password]);

  return (
    <div className="auth-container">
      <h2 className="auth-container__title">Begin your adventure!</h2>
      <Input
        value={email}
        placeholder={"Your email address"}
        label={"Email"}
        handleChangeValue={(value) => setEmail(value)}
      />
      <Input
        value={password}
        placeholder={"Your password"}
        label={"Password"}
        handleChangeValue={(value) => setPassword(value)}
        type="password"
      />

      <Button
        onClick={submitForm}
        text={"Log in"}
        customClass={"auth-container__btn"}
      />

      <button className="auth-container__switch" onClick={switchView}>
        You don't have an account? Create one
      </button>
    </div>
  );
};

export default SignIn;
