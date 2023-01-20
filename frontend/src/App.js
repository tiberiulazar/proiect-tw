import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Auth from "./screens/Auth/Auth";
import Dashboard from "./screens/Dashboard/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectUser } from "./store/selectors";

function App() {
  const user = useSelector(selectUser);

  return (
    <>
      <Switch>
        <Route path={"/dashboard"}>
          {!user ? <Redirect to={"/auth"} /> : <Dashboard />}
        </Route>
        <Route path={"/dashboard/profile"}></Route>
        <Route path={"/auth"}>
          {user ? <Redirect to={"/dashboard"} /> : <Auth />}
        </Route>
        <Route path={"/admin"}></Route>
        <Route path={"*"}>
          <Redirect to={"/auth"} />
        </Route>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
