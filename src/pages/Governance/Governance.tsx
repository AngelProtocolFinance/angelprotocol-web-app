import { Switch, Route, useRouteMatch } from "react-router-dom";
import { govern } from "types/routes";
import Landing from "./Landing";
import Details from "./Details";

export default function Governance() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/${govern.index}`} component={Landing} />
      <Route exact path={`${path}/${govern.poll}/:id`} component={Details} />
    </Switch>
  );
}
