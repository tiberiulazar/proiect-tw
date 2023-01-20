import AdminMenu from "./components/AdminMenu/AdminMenu";
import UserMenu from "./components/UserMenu/UserMenu";

import "./Menu.styles.css";

const Menu = ({ history }) => {
  return <div className="menu">{true ? <UserMenu /> : <AdminMenu />}</div>;
};

export default Menu;
