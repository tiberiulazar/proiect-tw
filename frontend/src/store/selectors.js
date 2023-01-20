export const selectUser = (state) => state?.user?.data;
export const selectUserToken = (state) => state?.user?.data?.token;
export const selectUserRole = (state) => state?.user?.data?.role;
export const selectUserTrips = (state) => ({
  likedTrips: state?.user?.data?.likedTrips || [],
  completedTrips: state?.user?.data?.completedTrips || [],
  startedTrips: state?.user?.data?.startedTrips || [],
});
export const selectLikedTrips = (state) =>
  state?.user?.data?.likedTrips?.map((trip) => trip?.id);
export const selectStartedTrips = (state) =>
  state?.user?.data?.startedTrips?.map((trip) => trip?.id);
export const selectCompletedTrips = (state) =>
  state?.user?.data?.completedTrips?.map((trip) => trip?.id);

export const selectTrips = (state) => state?.trips?.data;
