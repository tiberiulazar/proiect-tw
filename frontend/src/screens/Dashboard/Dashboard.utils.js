export const getCurrentScreenTitle = (pathname) => {
  switch (pathname) {
    case "/dashboard":
      return "Home";
    case "/dashboard/discover":
      return "Discover";
    case "/dashboard/trips/started":
      return "My started trips";
    case "/dashboard/trips/favourites":
      return "My favourites trips";
    case "/dashboard/trips/completed":
      return "My completed trips";
    case "/dashboard/profile":
      return "My profile";
    default:
      return "Dashboard";
  }
};
