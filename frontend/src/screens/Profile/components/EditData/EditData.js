import { useCallback, useState } from "react";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";

import { API_KEY } from "../../../../utils/constants";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../store/slices/userSlice";
import { toast } from "react-toastify";

const EditData = ({ values, setEditOn }) => {
  const dispatch = useDispatch();
  const { id, token } = values;
  const [firstName, setFirstName] = useState(values?.firstName);
  const [lastName, setLastName] = useState(values?.lastName);
  const [email, setEmail] = useState(values?.email);

  const handleEdit = useCallback(async () => {
    try {
      const response = await fetch(`${API_KEY}/users-api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      });

      if (!response.ok) {
        throw response;
      }

      const userData = await response.json();
      dispatch(updateUser(userData?.data));
      toast.success(userData?.message);
      setEditOn(false);
    } catch (err) {
      console.warn(err);
      toast.error(err?.statusText);
    }
  }, [values]);

  return (
    <div className="profile__data">
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
      <div className="profile__btn">
        <Button
          customClass={"profile__button--first"}
          text={"Cancel"}
          onClick={() => setEditOn(false)}
        />
        <Button text={"Save"} onClick={handleEdit} />
      </div>
    </div>
  );
};

export default EditData;
