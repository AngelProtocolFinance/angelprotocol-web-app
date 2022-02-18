import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { proposal_types } from "constants/routes";
import MemberUpdator from "./Templates/MemberUpdator/MemberUpdator";

export default function Proposer() {
  const { path } = useRouteMatch();
  return (
    <div className="padded-container grid grid-cols-a1">
      <ProposalTypes />
      <div className="justify-self-center">
        <Switch>
          <Route path={`${path}/${proposal_types.admin_add_member}`}>
            <TransactionSuite<{}> Context={MemberUpdator} contextProps={{}} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function ProposalTypes() {
  const { url } = useRouteMatch();
  return (
    <div className="bg-white flex flex-col">
      <p>admin</p>
      <NavLink to={`${url}/${proposal_types.admin_add_member}`}>
        update members
      </NavLink>
    </div>
  );
}
