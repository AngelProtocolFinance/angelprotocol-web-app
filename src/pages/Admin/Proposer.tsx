import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { proposal_types } from "constants/routes";
import MemberUpdator from "./Templates/MemberUpdator/MemberUpdator";
import MemberUpdateForm from "./Templates/MemberUpdator/MemberUpdaterForm";

export default function Proposer() {
  const { path } = useRouteMatch();
  return (
    <div className="padded-container grid gap-2 grid-cols-a1 min-h-screen pb-4">
      <ProposalTypes />
      <Switch>
        <Route path={`${path}/${proposal_types.admin_add_member}`}>
          <MemberUpdator>
            <MemberUpdateForm />
          </MemberUpdator>
        </Route>
      </Switch>
    </div>
  );
}

function ProposalTypes() {
  const { url } = useRouteMatch();
  return (
    <div className="bg-white flex flex-col p-4 bg-opacity-5 shadow-inner rounded-md">
      <p>admin</p>
      <NavLink to={`${url}/${proposal_types.admin_add_member}`}>
        update members
      </NavLink>
    </div>
  );
}
