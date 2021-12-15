// import AppHead from "components/Headers/AppHead";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { govern } from "types/routes";
import Landing from "./Landing";
import Details from "./Details";
import DappHead from "components/Headers/DappHead";

export default function Governance() {
  const { path } = useRouteMatch();

  return (
    <div className="grid grid-rows-a1 pt-2">
      <DappHead />
      <Switch>
        <Route exact path={`${path}/${govern.index}`} component={Landing} />
        <Route exact path={`${path}/${govern.poll}/:id`} component={Details} />
      </Switch>
    </div>
  );
}
