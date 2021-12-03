import AppHead from "components/Headers/AppHead";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { govern } from "types/routes";
import Landing from "./Landing";
import Details from "./Details";

export default function Governance() {
  const { path } = useRouteMatch();
  console.log(path);
  return (
    <div className="grid grid-rows-a1 min-h-screen pt-2 pb-16">
      <AppHead />
      <Switch>
        <Route exact path={`${path}/${govern.index}`} component={Landing} />
        <Route exact path={`${path}/${govern.poll}/:id`} component={Details} />
      </Switch>
    </div>
  );
}
