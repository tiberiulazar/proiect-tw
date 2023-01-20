import { useMemo } from "react";
import "./Trip.styles.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCompletedTrips,
  selectLikedTrips,
  selectStartedTrips,
  selectUser,
} from "../../store/selectors";
import { API_KEY } from "../../utils/constants";
import { updateUser } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import { tripTypeEnum } from "./Trip.constants";

const Trip = ({ data, type }) => {
  const { name, description, difficulty, distance, duration, id: tid } = data;
  const { id, token } = useSelector(selectUser);
  const dispatch = useDispatch();
  const likedTripsIds = useSelector(selectLikedTrips);
  const startedTrips = useSelector(selectStartedTrips);
  const completedTrips = useSelector(selectCompletedTrips);

  const tripLiked = useMemo(
    () => likedTripsIds?.includes(tid),
    [tid, likedTripsIds]
  );

  const tripStarted = useMemo(
    () => startedTrips?.includes(tid),
    [tid, startedTrips]
  );

  const tripCompleted = useMemo(
    () => completedTrips?.includes(tid),
    [tid, completedTrips]
  );

  const formatedDescription = useMemo(
    () =>
      description.length > 70 ? `${description.slice(0, 67)}...` : description,
    [description]
  );

  const handleStart = async () => {
    try {
      const response = await fetch(
        `${API_KEY}/users-api/users/${id}/startTrip/${tid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: token,
          },
        }
      );

      if (!response.ok) {
        throw response;
      }

      const responseData = await response.json();

      toast.success(responseData?.message);
      dispatch(updateUser(responseData.data));
    } catch (err) {
      const { message } = await err?.json();
      toast.error(message);
    }
  };

  const handleFavoourite = async () => {
    try {
      const response = await fetch(
        `${API_KEY}/users-api/users/${id}/${
          tripLiked ? "dislikeTrip" : "likeTrip"
        }/${tid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: token,
          },
        }
      );

      if (!response.ok) {
        throw response;
      }

      const responseData = await response.json();

      toast.success(responseData?.message);
      dispatch(updateUser(responseData.data));
    } catch (err) {
      const { message } = await err?.json();
      toast.error(message);
    }
  };

  const handleTripAction = async (type) => {
    try {
      const response = await fetch(
        `${API_KEY}/users-api/users/${id}/${
          type === "finish" ? "finishTrip" : "cancelTrip"
        }/${tid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: token,
          },
        }
      );

      if (!response.ok) {
        throw response;
      }

      const responseData = await response.json();

      toast.success(responseData?.message);
      dispatch(updateUser(responseData.data));
    } catch (err) {
      const { message } = await err?.json();
      toast.error(message);
    }
  };

  return (
    <div className="trip">
      <div className="trip__info">
        <h2 className="trip__name">{name}</h2>
        <p className="trip__description">{formatedDescription}</p>
        <span className="trip__coord">Distance: {distance} km</span>{" "}
        <span className="trip__coord">Duration: {duration} minutes</span>
      </div>
      <p className="trip__difficulty">{difficulty}</p>
      {tripCompleted && tripTypeEnum.COMPLETED === type ? (
        <p className="trip__completed">Completed</p>
      ) : (
        <div className="trip__actions">
          {!tripStarted ? (
            <Button
              customClass={"trip__btn"}
              text={"Start"}
              onClick={handleStart}
            />
          ) : (
            <>
              <Button
                customClass={"trip__btn"}
                text={"Cancel"}
                onClick={() => handleTripAction("cancel")}
              />
              <Button
                customClass={"trip__btn"}
                text={"Finish"}
                onClick={() => handleTripAction("finish")}
              />
            </>
          )}

          <Button
            customClass={"trip__btn"}
            text={tripLiked ? "Dislike" : "Like"}
            onClick={handleFavoourite}
          />
        </div>
      )}
    </div>
  );
};

export default Trip;
