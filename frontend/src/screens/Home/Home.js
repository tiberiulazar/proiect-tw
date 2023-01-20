import { useHistory } from "react-router-dom";
import List from "../../components/List/List";
import { tripTypeEnum } from "../../components/Trip/Trip.constants";
import "./Home.styles.css";
import { useSelector } from "react-redux";
import { selectUserTrips } from "../../store/selectors";

const Home = () => {
  const history = useHistory();
  const { likedTrips, completedTrips, startedTrips } =
    useSelector(selectUserTrips) || {};

  return (
    <div className="home">
      <div className="home__main">
        <List
          type={tripTypeEnum.STARTED}
          title="Started trips"
          data={startedTrips}
          maxItems={4}
          handleSeeAll={() => history.push("/dashboard/trips/started")}
          emptyListMessage="There are no trips started"
        />
        <List
          type={tripTypeEnum.FAVOURITE}
          title="Favourites"
          data={likedTrips}
          maxItems={4}
          handleSeeAll={() => history.push("/dashboard/trips/favourites")}
          emptyListMessage="There are no trips liked"
        />
        <List
          type={tripTypeEnum.COMPLETED}
          title="Completed"
          data={completedTrips}
          maxItems={4}
          handleSeeAll={() => history.push("/dashboard/trips/completed")}
          emptyListMessage="There are no trips completed"
        />
      </div>
    </div>
  );
};

export default Home;
