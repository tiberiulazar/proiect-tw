import { useSelector } from "react-redux";
import { selectUser } from "../../store/selectors";
import { getUserInitials } from "../../utils/functions";
import "./Profile.styles.css";
import { useMemo } from "react";
import { useState } from "react";
import DisplayData from "./components/DisplayData/DisplayData";
import EditData from "./components/EditData/EditData";

const Profile = () => {
  const { firstName, lastName, email, id, token } = useSelector(selectUser);

  const userInitials = useMemo(
    () => getUserInitials(firstName, lastName),
    [firstName, lastName]
  );
  const values = useMemo(
    () => ({
      firstName,
      lastName,
      email,
      id,
      token,
    }),
    [firstName, lastName, email, id, token]
  );
  const [editOn, setEditOn] = useState(false);

  return (
    <div className="profile">
      <div className="profile__avatar">{userInitials}</div>
      {editOn ? (
        <EditData values={values} setEditOn={setEditOn} />
      ) : (
        <DisplayData values={values} setEditOn={setEditOn} />
      )}
    </div>
  );
};

export default Profile;
