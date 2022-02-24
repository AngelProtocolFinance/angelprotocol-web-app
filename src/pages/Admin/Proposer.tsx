import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { proposal_types } from "constants/routes";
import MemberUpdator from "./Templates/MemberUpdator/MemberUpdator";
import MemberUpdateForm from "./Templates/MemberUpdator/MemberUpdaterForm";
import EndowmentUpdateForm from "./Templates/EndowmentUpdator/EndowmentUpdateForm";
import EndowmentUpdator from "./Templates/EndowmentUpdator/EndowmentUpdator";

export default function Proposer() {
  const { path } = useRouteMatch();
  return (
    <div className="padded-container grid gap-2 grid-cols-a1 min-h-screen pb-4">
      <ProposalTypes />
      <Switch>
        <Route path={`${path}/${proposal_types.admin_update_members}`}>
          <MemberUpdator>
            <MemberUpdateForm />
          </MemberUpdator>
        </Route>
        <Route path={`${path}/${proposal_types.change_endowment_status}`}>
          <EndowmentUpdator>
            <EndowmentUpdateForm />
          </EndowmentUpdator>
        </Route>
      </Switch>
    </div>
  );
}

function ProposalTypes() {
  const { url } = useRouteMatch();
  const linkStyles = {
    className: "text-angel-grey px-4 py-1",
    activeClassName: "bg-angel-blue text-white-grey pointer-events-none",
  };

  return (
    <div className="bg-white-grey flex flex-col py-4 shadow-md rounded-md">
      <ProposalCategory title="AP CW4" />
      <NavLink
        to={`${url}/${proposal_types.admin_update_members}`}
        {...linkStyles}
      >
        Update AP Members
      </NavLink>
      <NavLink
        to={`${url}/${proposal_types.change_endowment_status}`}
        {...linkStyles}
      >
        Change Endowment Status
      </NavLink>
    </div>
  );
}

function ProposalCategory(props: { title: string }) {
  return <h3 className="px-4 font-bold text-angel-grey">{props.title}</h3>;
}
