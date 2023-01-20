import { useSelector } from "react-redux";
import List from "../../components/List/List";
import { tripTypeEnum } from "../../components/Trip/Trip.constants";
import "./FavouritesTrips.styles.css";
import { selectUserTrips } from "../../store/selectors";

const FavouritesTrips = () => {
  const { likedTrips } = useSelector(selectUserTrips);
  return (
    <div className="favourites">
      <List type={tripTypeEnum.FAVOURITE} data={likedTrips} />
    </div>
  );
};

export default FavouritesTrips;
