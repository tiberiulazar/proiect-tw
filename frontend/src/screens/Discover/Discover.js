import { useEffect } from "react";
import List from "../../components/List/List";
import { tripTypeEnum } from "../../components/Trip/Trip.constants";
import { TRIPS_DATA } from "../Dashboard/Dashboard.mocked";
import { useDispatch, useSelector } from "react-redux";
import { selectTrips, selectUserToken } from "../../store/selectors";

import "./Discover.styles.css";
import { updateTrips } from "../../store/slices/tripsSlice";
import { API_KEY } from "../../utils/constants";

const Discover = () => {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const trips = useSelector(selectTrips);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripsResponse = await fetch(`${API_KEY}/trips-api/trips`, {
          headers: {
            auth: userToken,
          },
        });

        if (!tripsResponse.ok) {
          throw tripsResponse;
        }

        const tripsData = await tripsResponse.json();
        dispatch(updateTrips(tripsData));
      } catch (err) {
        console.warn(err);
      }
    };
    fetchData();
  }, [userToken]);
  return (
    <div className="discover">
      <List type={tripTypeEnum.NORMAL} data={trips} />
    </div>
  );
};

export default Discover;
