import { useSelector } from "react-redux";
import List from "../../components/List/List";
import { tripTypeEnum } from "../../components/Trip/Trip.constants";
import "./StartedTrips.styles.css";
import { selectUserTrips } from "../../store/selectors";

const StartedTrips = () => {
  const { startedTrips } = useSelector(selectUserTrips);
  return (
    <div className="favourites">
      <List type={tripTypeEnum.STARTED} data={startedTrips} />
    </div>
  );
};

export default StartedTrips;
