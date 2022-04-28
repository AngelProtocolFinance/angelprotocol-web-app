import { NavLink, Route, Routes } from "react-router-dom";
import CW3Configurer from "pages/Admin/Templates/CW3Configurer/CW3Configurer";
import FundSender from "pages/Admin/Templates/FundSender/FundSender";
import MemberUpdator from "pages/Admin/Templates/MemberUpdator/MemberUpdator";
import { proposalRoutes } from "pages/Admin/constants";
// import MemberUpdator from "./Templates/MemberUpdator/MemberUpdator";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import ProfileEditor from "./Templates/ProfileEditor/ProfileEditor";

export default function Proposer() {
  return (
    <div className="grid gap-2 grid-cols-a1">
      <ProposalTypes />
      <Routes>
        <Route index element={<MemberUpdator />} />
        <Route
          path={proposalRoutes["admin-group-update-cw3-config"]}
          element={<CW3Configurer />}
        />
        <Route
          path={proposalRoutes["admin-group-fund-transfer"]}
          element={<FundSender />}
        />
        <Route
          path={proposalRoutes["endowment-update-profile"]}
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
      <NavLink end to={proposalRoutes["index"]} className={styler}>
        Update group Members
      </NavLink>
      <NavLink
        to={proposalRoutes["admin-group-update-cw3-config"]}
        className={styler}
      >
        Update voting params
      </NavLink>
      <NavLink
        to={proposalRoutes["admin-group-fund-transfer"]}
        className={styler}
      >
        Fund transfer
      </NavLink>
      <ProposalCategory title="Endowment" classes="mt-4" />
      <NavLink
        to={proposalRoutes["endowment-update-profile"]}
        className={styler}
      >
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
