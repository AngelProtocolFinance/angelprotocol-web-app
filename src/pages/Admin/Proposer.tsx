import {
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { proposal_types } from "constants/routes";
import MemberUpdator from "./Templates/MemberUpdator/MemberUpdator";
import MemberUpdateForm from "./Templates/MemberUpdator/MemberUpdaterForm";
import EndowmentUpdator from "./Templates/EndowmentUpdator/EndowmentUpdator";
import FundCreator from "./Templates/FundCreator/FundCreator";
import FundDestroyer from "./Templates/FundDestroyer/FundDestroyer";
import FundUpdator from "./Templates/FundUpdator/FundUpdator";
import AllianceEditor from "./Templates/AllianceEditor/AllianceEditor";

export default function Proposer() {
  const { path } = useRouteMatch();
  return (
    <div className="grid gap-2 grid-cols-a1">
      <ProposalTypes />
      <Switch>
        {/**apCW4 */}
        <Route
          path={`${path}/${proposal_types.admin_update_members}`}
          component={MemberUpdator}
        />
        {/**endowments */}
        <Route
          path={`${path}/${proposal_types.change_endowment_status}`}
          component={EndowmentUpdator}
        />

        {/**index fund */}
        <Route
          path={`${path}/${proposal_types.create_fund}`}
          component={FundCreator}
        />
        <Route
          path={`${path}/${proposal_types.destroy_fund}`}
          component={FundDestroyer}
        />
        <Route
          path={`${path}/${proposal_types.update_fund}`}
          component={FundUpdator}
        />
        <Route
          path={`${path}/${proposal_types.alliance_members}`}
          component={AllianceEditor}
        />
        <Route exact path={`${path}/${proposal_types.index}`}>
          <Redirect to={`${path}/${proposal_types.admin_update_members}`} />
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

      <ProposalCategory title="Index fund" classes="mt-4" />
      <NavLink to={`${url}/${proposal_types.create_fund}`} {...linkStyles}>
        Create Fund
      </NavLink>
      <NavLink to={`${url}/${proposal_types.destroy_fund}`} {...linkStyles}>
        Remove Fund
      </NavLink>
      <NavLink to={`${url}/${proposal_types.update_fund}`} {...linkStyles}>
        Update Fund
      </NavLink>
      <NavLink to={`${url}/${proposal_types.alliance_members}`} {...linkStyles}>
        Edit Alliance members
      </NavLink>

      <ProposalCategory title="Endowment" classes="mt-4" />
      <NavLink
        to={`${url}/${proposal_types.change_endowment_status}`}
        {...linkStyles}
      >
        Change Endowment Status
      </NavLink>
    </div>
  );
}

function ProposalCategory(props: { title: string; classes?: string }) {
  return (
    <h3 className={`px-4 font-bold text-angel-grey ${props.classes || ""}`}>
      {props.title}
    </h3>
  );
}
