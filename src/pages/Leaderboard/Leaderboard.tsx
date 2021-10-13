import AppHead from "components/Headers/AppHead";
import Nav from "./Nav";

import { Route, Switch, useRouteMatch } from "react-router";
import { app } from "types/routes";
import BoardTCA from "./BoardTCA";
import BoardCharity from "./BoardCharity";

export default function Leaderboard() {
  const { path } = useRouteMatch();
  //cast names to desired type
  return (
    <section className="pb-16 grid content-start h-screen">
      <AppHead />
      <h3 className="pt-2 padded-container uppercase text-white-grey text-3xl font-bold">
        Leaderboards
      </h3>
      <Nav />
      <Switch>
        <Route exact path={`${path}`} component={BoardCharity} />
        <Route path={`${path}${app.board_tca}`} component={BoardTCA} />
      </Switch>
    </section>
  );
}
