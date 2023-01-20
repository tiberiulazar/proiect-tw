import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_KEY } from "../../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../../store/slices/userSlice";
import { selectUserToken } from "../../../../store/selectors";
import { toast } from "react-toastify";

const UserMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const userToken = useSelector(selectUserToken);

  const handleLogOut = useCallback(() => {
    fetch(`${API_KEY}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: userToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(res?.message);
        dispatch(clearUser());
      })
      .catch((err) => console.warn(err));
  }, [userToken]);

  return (
    <ul className="menu__main">
      <li className="menu__item">
        <Link
          className={`menu__link ${
            pathname === "/dashboard" && "menu__link--active"
          }`}
          to={"/dashboard"}
        >
          Home
        </Link>
      </li>
      <li className="menu__item">
        <Link
          className={`menu__link ${
            pathname === "/dashboard/discover" && "menu__link--active"
          }`}
          to={"/dashboard/discover"}
        >
          Discover
        </Link>
      </li>
      <li className="menu__item">
        <Link
          className={`menu__link ${
            pathname === "/dashboard/trips/started" && "menu__link--active"
          }`}
          to={"/dashboard/trips/started"}
        >
          Started
        </Link>
      </li>
      <li className="menu__item">
        <Link
          className={`menu__link ${
            pathname === "/dashboard/trips/favourites" && "menu__link--active"
          }`}
          to={"/dashboard/trips/favourites"}
        >
          Favourites
        </Link>
      </li>
      <li className="menu__item">
        <Link
          className={`menu__link ${
            pathname === "/dashboard/trips/completed" && "menu__link--active"
          }`}
          to={"/dashboard/trips/completed"}
        >
          Completed
        </Link>
      </li>
      <li className="menu__item">
        <Link
          className={`menu__link ${
            pathname === "/dashboard/profile" && "menu__link--active"
          }`}
          to={"/dashboard/profile"}
        >
          Account
        </Link>
      </li>
      <li className="menu__item">
        <Link className="menu__link" onClick={handleLogOut} to={""}>
          Log out
        </Link>
      </li>
    </ul>
  );
};

export default UserMenu;
