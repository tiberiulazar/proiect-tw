import { useSelector } from "react-redux";
import "./Header.styles.css";
import { selectUser } from "../../store/selectors";
import { useMemo } from "react";
import { getUserInitials } from "../../utils/functions";
import { useHistory } from "react-router-dom";

const Header = ({ title }) => {
  const history = useHistory();
  const { firstName, lastName } = useSelector(selectUser) || {};
  const userInitials = useMemo(
    () => getUserInitials(firstName, lastName),
    [firstName, lastName]
  );

  return (
    <div className="header">
      <h2 className="header__title">{title}</h2>
      <div
        className="header__profile"
        onClick={() => history.push("/dashboard/profile")}
      >
        <p className="header__initials">{userInitials}</p>
      </div>
    </div>
  );
};

export default Header;
