import { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { govern } from "constants/routes";
import Landing from "./Landing";

const Details = lazy(() => import("./Details"));

export default function Governance() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/${govern.index}`} component={Landing} />
      <Route exact path={`${path}/${govern.poll}/:id`} component={Details} />
    </Switch>
  );
}
