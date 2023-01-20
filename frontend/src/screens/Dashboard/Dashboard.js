import { Route, Switch, useLocation } from "react-router-dom";

import Menu from "../../components/Menu/Menu";
import "./Dashboard.styles.css";
import { useMemo } from "react";
import { getCurrentScreenTitle } from "./Dashboard.utils";
import Header from "../../components/Header/Header";
import Home from "../Home/Home";
import Discover from "../Discover/Discover";
import FavouritesTrips from "../FavouritesTrips/FavouritesTrips";
import StartedTrips from "../StartedTrips/StartedTrips";
import CompletedTrips from "../CompletedTrips/CompletedTrips";
import Profile from "../Profile/Profile";

const Dashboard = () => {
  const location = useLocation();

  const screenTitle = useMemo(
    () => getCurrentScreenTitle(location.pathname),
    [location]
  );

  return (
    <div className="dashboard">
      <div className="dashboard__menu">
        <Menu />
      </div>
      <div className="dashboard__main">
        <Header title={screenTitle} />
        <Switch>
          <Route path={`/dashboard/discover`} exact>
            <Discover />
          </Route>
          <Route path={`/dashboard/trips/started`} exact>
            <StartedTrips />
          </Route>
          <Route path={`/dashboard/trips/favourites`} exact>
            <FavouritesTrips />
          </Route>
          <Route path={`/dashboard/trips/completed`} exact>
            <CompletedTrips />
          </Route>
          <Route path={`/dashboard/profile`} exact>
            <Profile />
          </Route>
          <Route path={`/dashboard`} exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
