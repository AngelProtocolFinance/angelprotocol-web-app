import Nav from "./TCA/Nav";
import { Route, Switch, useRouteMatch } from "react-router";
import { app } from "types/routes";
import BoardTCA from "./TCA/Board";
import BoardCharity from "./Charity/Board";
import DappHead from "components/Headers/DappHead";

export default function Leaderboard() {
  const { path } = useRouteMatch();
  //cast names to desired type
  return (
    <section className="pb-16 grid content-start min-h-screen">
      <DappHead />
      <h3 className="mt-6 padded-container uppercase text-white-grey text-3xl font-bold">
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
