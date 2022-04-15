import { NavLink, Routes, Route } from "react-router-dom";
import { proposalTypes } from "constants/routes";
// import MemberUpdator from "./Templates/MemberUpdator/MemberUpdator";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import MemberUpdator from "pages/Admin/Templates/MemberUpdator/MemberUpdator";
import CW3Configurer from "pages/Admin/Templates/CW3Configurer/CW3Configurer";
import FundSender from "pages/Admin/Templates/FundSender/FundSender";
import ProfileEditor from "./Templates/ProfileEditor/ProfileEditor";

export default function Proposer() {
  return (
    <div className="grid gap-2 grid-cols-a1">
      <ProposalTypes />
      <Routes>
        <Route index element={<MemberUpdator />} />
        <Route
          path={proposalTypes.adminGroup_updateCW3Config}
          element={<CW3Configurer />}
        />
        <Route
          path={proposalTypes.adminGroup_fundTransfer}
          element={<FundSender />}
        />
        <Route
          path={proposalTypes.endowment_updateProfile}
          element={<ProfileEditor />}
        />
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
      <ProposalCategory title="Admin Group" />
      <NavLink end to={proposalTypes.index} className={styler}>
        Update group Members
      </NavLink>
      <NavLink to={proposalTypes.adminGroup_updateCW3Config} className={styler}>
        Update voting params
      </NavLink>
      <NavLink to={proposalTypes.adminGroup_fundTransfer} className={styler}>
        Fund transfer
      </NavLink>
      <ProposalCategory title="Endowment" classes="mt-4" />
      <NavLink to={proposalTypes.endowment_updateProfile} className={styler}>
        Update Profile
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
