import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { proposal_types } from "types/routes";
import UpdateForm from "./Templates/UpdateForm";

export default function Proposer() {
  const { path } = useRouteMatch();
  return (
    <div className="padded-container grid grid-cols-a1">
      <ProposalTypes />
      <div className="justify-self-center">
        <Switch>
          <Route
            path={`${path}/${proposal_types.admin_add_member}`}
            component={UpdateForm}
          />
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
