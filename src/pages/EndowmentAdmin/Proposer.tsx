import { NavLink, Routes, Route } from "react-router-dom";
import { proposal_types } from "constants/routes";
// import MemberUpdator from "./Templates/MemberUpdator/MemberUpdator";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import MemberUpdator from "pages/Admin/Templates/MemberUpdator/MemberUpdator";

export default function Proposer() {
  return (
    <div className="grid gap-2 grid-cols-a1">
      <ProposalTypes />
      <Routes>
        <Route index element={<MemberUpdator />} />
      </Routes>
    </div>
  );
}

const styler = createNavLinkStyler(
  "text-angel-grey px-4 py-1",
  "bg-angel-blue text-white-grey pointer-events-none"
);
function ProposalTypes() {
  return (
    <div className="bg-white-grey flex flex-col py-4 shadow-md rounded-md">
      <ProposalCategory title="admin group" />
      <NavLink end to={proposal_types.index} className={styler}>
        Update group Members
      </NavLink>
      <ProposalCategory title="Index fund" classes="mt-4" />
      <NavLink to={proposal_types.create_fund} className={styler}>
        Create Fund
      </NavLink>
      <NavLink to={proposal_types.destroy_fund} className={styler}>
        Remove Fund
      </NavLink>
      <NavLink to={proposal_types.update_fund} className={styler}>
        Update Fund
      </NavLink>
      <ProposalCategory title="Endowment" classes="mt-4" />
      <NavLink to={proposal_types.change_endowment_status} className={styler}>
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
