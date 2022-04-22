import { NavLink, Route, Routes } from "react-router-dom";
import { proposalTypes } from "types/routes";
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

export default function Proposer() {
  return (
    <div className="grid gap-2 grid-cols-a1">
      <ProposalTypes />
      <Routes>
        <Route
          path={proposalTypes.endowment_updateStatus}
          element={<EndowmentUpdator />}
        />
        <Route
          path={proposalTypes.indexFund_createFund}
          element={<FundCreator />}
        />
        <Route
          path={proposalTypes.indexFund_removeFund}
          element={<FundDestroyer />}
        />
        <Route
          path={proposalTypes.indexFund_updateFundMembers}
          element={<FundUpdator />}
        />
        <Route
          path={proposalTypes.indexFund_configUpdate}
          element={<FundConfigurer />}
        />
        <Route
          path={proposalTypes.indexFund_allianceEdits}
          element={<AllianceEditor />}
        />
        <Route
          path={proposalTypes.indexFund_ownerUpdate}
          element={<IndexFundOwner />}
        />
        <Route
          path={proposalTypes.adminGroup_updateCW3Config}
          element={<CW3Configurer />}
        />
        <Route
          path={proposalTypes.adminGroup_fundTransfer}
          element={<FundSender />}
        />
        <Route
          path={proposalTypes.registrar_updateConfig}
          element={<RegistrarConfigurer />}
        />
        <Route
          path={proposalTypes.registrar_updateOwner}
          element={<RegistrarOwner />}
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
      <NavLink end to={proposalTypes.index} className={styler}>
        Update group members
      </NavLink>
      <NavLink to={proposalTypes.adminGroup_updateCW3Config} className={styler}>
        Update voting params
      </NavLink>
      <NavLink to={proposalTypes.adminGroup_fundTransfer} className={styler}>
        Fund transfer
      </NavLink>

      <ProposalCategory title="Index fund" classes="mt-4" />
      <NavLink to={proposalTypes.indexFund_createFund} className={styler}>
        Create Fund
      </NavLink>
      <NavLink to={proposalTypes.indexFund_removeFund} className={styler}>
        Remove Fund
      </NavLink>
      <NavLink
        to={proposalTypes.indexFund_updateFundMembers}
        className={styler}
      >
        Update Fund Members
      </NavLink>
      <NavLink to={proposalTypes.indexFund_configUpdate} className={styler}>
        Update Config
      </NavLink>
      <NavLink to={proposalTypes.indexFund_ownerUpdate} className={styler}>
        Update Owner
      </NavLink>
      <NavLink to={proposalTypes.indexFund_allianceEdits} className={styler}>
        Edit Alliance List
      </NavLink>

      <ProposalCategory title="Endowment" classes="mt-4" />
      <NavLink to={proposalTypes.endowment_updateStatus} className={styler}>
        Change Endowment Status
      </NavLink>

      <ProposalCategory title="Registrar" classes="mt-4" />
      <NavLink to={proposalTypes.registrar_updateConfig} className={styler}>
        Update Config
      </NavLink>
      <NavLink to={proposalTypes.registrar_updateOwner} className={styler}>
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
