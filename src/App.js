import "./App.less";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Container/Authentication/Login/Login";
import Dashboard from "./Container/Dashboard/dashboard";
import NotFound from "./Container/404/404";
import PrivateRoute from "./Routes/PrivateRoute";
const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/Fraud" component={Dashboard} />
        <Route path='*' exact={true} component={NotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </>
  );
};

export default App;
