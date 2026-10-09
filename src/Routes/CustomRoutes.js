
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { setRoutingData } from "../store/actions/setup-forms-actions"
const CustomRoutes = ({
  RoutingData,
}) => {
  const route = useRouteMatch();
  const dispatch = useDispatch();
  const path = route.path;
  useEffect(() => {
    dispatch(setRoutingData(RoutingData))
  }, [RoutingData])
  return (
    <Switch>
      {RoutingData ? <><Route exact path={`${path}`} component={RoutingData[0].component} />
        {RoutingData.map((item, index) => <Route key={index} path={`${path}/${item.path}`} component={item.component} />)}
      </> : console.log("Null")}
    </Switch>
  );
};
export default CustomRoutes;