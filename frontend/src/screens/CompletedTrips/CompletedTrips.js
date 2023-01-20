import { useSelector } from "react-redux";
import List from "../../components/List/List";
import { tripTypeEnum } from "../../components/Trip/Trip.constants";
import "./CompletedTrips.styles.css";
import { selectUserTrips } from "../../store/selectors";

const CompletedTrips = () => {
  const { completedTrips } = useSelector(selectUserTrips);
  return (
    <div className="favourites">
      <List type={tripTypeEnum.COMPLETED} data={completedTrips} />
    </div>
  );
};

export default CompletedTrips;
