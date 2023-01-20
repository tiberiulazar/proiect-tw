import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import { useDispatch } from "react-redux";
import { addUser } from "../../../../store/slices/userSlice";

const SignUp = ({ switchView }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitForm = useCallback(async () => {
    if (!firstName) {
      toast.error("You forgot to enter your first name");
      return;
    }
    if (firstName.length < 3) {
      toast.error("Your first name must be at least 3 characters");
      return;
    }
    if (!lastName) {
      toast.error("You forgot to enter your last name");
      return;
    }
    if (lastName.length < 3) {
      toast.error("Your last name must be at least 3 characters");
      return;
    }
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
    if (password !== confirmPassword) {
      toast.error("Your password confirmation doesn't match");
      return;
    }

    const userBody = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
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
      dispatch(addUser(userData.data));
    } catch (err) {
      console.warn(err);
      toast.error(err?.statusText);
    }
  }, [firstName, lastName, email, password, confirmPassword]);

  return (
    <div className="auth-container">
      <h2 className="auth-container__title">Start your journey right now!</h2>
      <Input
        value={firstName}
        placeholder={"Your first name"}
        label={"First Name"}
        handleChangeValue={(value) => setFirstName(value)}
      />
      <Input
        value={lastName}
        placeholder={"Your last name"}
        label={"Last Name"}
        handleChangeValue={(value) => setLastName(value)}
      />
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
      <Input
        value={confirmPassword}
        placeholder={"Confirm password"}
        label={"Confirm password"}
        handleChangeValue={(value) => setConfirmPassword(value)}
        type="password"
      />
      <Button
        onClick={submitForm}
        text={"Create account"}
        customClass={"auth-container__btn"}
      />
      <button className="auth-container__switch" onClick={switchView}>
        You already have an account? Sign in
      </button>
    </div>
  );
};

export default SignUp;
