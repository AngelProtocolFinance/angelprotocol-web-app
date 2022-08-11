import { NavLink, Route, Routes } from "react-router-dom";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import AllianceEditor from "./Templates/AllianceEditor/AllianceEditor";
import CW3Configurer from "./Templates/CW3Configurer/CW3Configurer";
import EndowmentUpdator from "./Templates/EndowmentUpdator/EndowmentUpdator";
import FundConfigurer from "./Templates/FundConfigurer/FundConfigurer";
import FundCreator from "./Templates/FundCreator/FundCreator";
import FundDestroyer from "./Templates/FundDestroyer/FundDestroyer";
import FundSender from "./Templates/FundSender/FundSender";
import FundUpdator from "./Templates/FundUpdator/FundUpdator";
import IndexFundOwner from "./Templates/IndexFundOwner/IndexFundOwner";
import MemberUpdator from "./Templates/MemberUpdator/MemberUpdator";
import RegistrarConfigurer from "./Templates/RegistrarConfigurer/RegistrarConfigurer";
import RegistrarOwner from "./Templates/RegistrarOwner/RegistrarOwner";
import { proposalRoutes } from "./constants";

export default function Proposer() {
  return (
    <div className="grid gap-2 grid-cols-[auto_1fr]">
      <ProposalTypes />
      <Routes>
        {/** _index-fund */}
        <Route
          path={proposalRoutes["indexfund-alliance-edit"]}
          element={<AllianceEditor />}
        />
        <Route
          path={proposalRoutes["indexfund-create-fund"]}
          element={<FundCreator />}
        />
        <Route
          path={proposalRoutes["indexfund-remove-fund"]}
          element={<FundDestroyer />}
        />
        <Route
          path={proposalRoutes["indexfund-update-fund-members"]}
          element={<FundUpdator />}
        />
        <Route
          path={proposalRoutes["indexfund-config-update"]}
          element={<FundConfigurer />}
        />
        <Route
          path={proposalRoutes["indexfund-owner-update"]}
          element={<IndexFundOwner />}
        />
        {/** _endowment */}
        <Route
          path={proposalRoutes["endowment-update-status"]}
          element={<EndowmentUpdator />}
        />
        {/** _registrar */}
        <Route
          path={proposalRoutes["registrar-update-config"]}
          element={<RegistrarConfigurer />}
        />
        <Route
          path={proposalRoutes["registrar-update-owner"]}
          element={<RegistrarOwner />}
        />
        {/**_admin-group */}
        <Route
          path={proposalRoutes["admin-group-update-cw3-config"]}
          element={<CW3Configurer />}
        />
        <Route
          path={proposalRoutes["admin-group-fund-transfer"]}
          element={<FundSender />}
        />
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
      <ProposalCategory title="Admin group" />
      <NavLink end to={proposalRoutes["index"]} className={styler}>
        Update group members
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

      <ProposalCategory title="Index fund" classes="mt-4" />
      <NavLink
        to={proposalRoutes["indexfund-alliance-edit"]}
        className={styler}
      >
        Edit Alliance List
      </NavLink>
      <NavLink to={proposalRoutes["indexfund-create-fund"]} className={styler}>
        Create Fund
      </NavLink>
      <NavLink to={proposalRoutes["indexfund-remove-fund"]} className={styler}>
        Remove Fund
      </NavLink>
      <NavLink
        to={proposalRoutes["indexfund-update-fund-members"]}
        className={styler}
      >
        Update Fund Members
      </NavLink>
      <NavLink
        to={proposalRoutes["indexfund-config-update"]}
        className={styler}
      >
        Update Config
      </NavLink>
      <NavLink to={proposalRoutes["indexfund-owner-update"]} className={styler}>
        Update Owner
      </NavLink>

      <ProposalCategory title="Endowment" classes="mt-4" />
      <NavLink
        to={proposalRoutes["endowment-update-status"]}
        className={styler}
      >
        Change Endowment Status
      </NavLink>

      <ProposalCategory title="Registrar" classes="mt-4" />
      <NavLink
        to={proposalRoutes["registrar-update-config"]}
        className={styler}
      >
        Update Config
      </NavLink>
      <NavLink to={proposalRoutes["registrar-update-owner"]} className={styler}>
        Update Owner
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
