import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <ul className="menu__main">
      <li className="menu__item">
        <Link className="menu__link" to={"/dashboard/admin/trips"}>
          Discover
        </Link>
      </li>
      <li className="menu__item">
        <Link className="menu__link" to={"/dashboard/admin/users"}>
          Started
        </Link>
      </li>
      <li className="menu__item">
        <Link className="menu__link" to={"/dashboard/admin/categories"}>
          Favourites
        </Link>
      </li>
      <li className="menu__item">
        <Link
          className="menu__link"
          onClick={() => {
            console.log("log out");
          }}
        >
          Log out
        </Link>
      </li>
    </ul>
  );
};

export default AdminMenu;
