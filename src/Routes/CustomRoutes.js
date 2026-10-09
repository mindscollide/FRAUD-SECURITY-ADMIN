import { Route, Routes } from "react-router";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { setRoutingData } from "../store/actions/setup-forms-actions";
const CustomRoutes = ({ RoutingData }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoutingData(RoutingData));
  }, [RoutingData]);
  const IndexComponent = RoutingData ? RoutingData[0].component : null;
  return (
    <Routes>
      {RoutingData ? (
        <>
          <Route index element={<IndexComponent />} />
          {RoutingData.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={<item.component />}
            />
          ))}
        </>
      ) : null}
    </Routes>
  );
};
export default CustomRoutes;
