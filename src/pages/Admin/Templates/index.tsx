import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { useAdminResources } from "../Guard";
import Nav from "./Nav";
import EndowmentUpdator from "./account/EndowmentStatus";
import ProfileEditor from "./account/ProfileEditor/ProfileEditor";
import CW3Configurer from "./cw3/Config";
import FundSender from "./cw3/FundSender/FundSender";
import MemberUpdator from "./cw4/MemberUpdator/MemberUpdator";
import AllianceEditor from "./indexfund/AllianceEditor/AllianceEditor";
import FundConfigurer from "./indexfund/FundConfigurer/FundConfigurer";
import FundCreator from "./indexfund/FundCreator/FundCreator";
import FundDestroyer from "./indexfund/FundDestroyer/FundDestroyer";
import FundUpdator from "./indexfund/FundUpdator/FundUpdator";
import IndexFundOwner from "./indexfund/IndexFundOwner/IndexFundOwner";
import RegistrarConfigurer from "./registrar/RegistrarConfigurer/RegistrarConfigurer";
import RegistrarOwner from "./registrar/RegistrarOwner/RegistrarOwner";
import { routes } from "./routes";

export default function Templates() {
  const { role } = useAdminResources();
  const routes = useMemo(() => {
    switch (role) {
      case "charity":
        return <CharityTemplates />;
      case "reviewer":
        return <ReviewerTemplates />;
      default:
        return <ApTemplates />;
    }
  }, [role]);

  return (
    <div className="grid gap-2 grid-cols-[auto_1fr]">
      <Nav />
      {routes}
    </div>
  );
}

function ApTemplates() {
  return (
    <Routes>
      {/** _index-fund */}
      <Route path={routes.if_alliance} element={<AllianceEditor />} />
      <Route path={routes.if_create} element={<FundCreator />} />
      <Route path={routes.if_remove} element={<FundDestroyer />} />
      <Route path={routes.if_members} element={<FundUpdator />} />
      <Route path={routes.if_config} element={<FundConfigurer />} />
      <Route path={routes.if_owner} element={<IndexFundOwner />} />

      {/** _account */}
      <Route path={routes.acc_endow_status} element={<EndowmentUpdator />} />

      {/** _registrar */}
      <Route path={routes.reg_config} element={<RegistrarConfigurer />} />
      <Route path={routes.reg_owner} element={<RegistrarOwner />} />

      {/**_cw3 */}
      <Route path={routes.cw3_config} element={<CW3Configurer />} />
      <Route path={routes.cw3_transfer} element={<FundSender />} />

      {/**_cw4 */}
      <Route path={routes.cw4_members} element={<MemberUpdator />} />
    </Routes>
  );
}

function CharityTemplates() {
  return (
    <Routes>
      {/** _endowment */}
      <Route path={routes.acc_profile} element={<ProfileEditor />} />

      {/**_cw3 */}
      <Route path={routes.cw3_config} element={<CW3Configurer />} />
      <Route path={routes.cw3_transfer} element={<FundSender />} />

      {/**_cw4 */}
      <Route path={routes.cw4_members} element={<MemberUpdator />} />
    </Routes>
  );
}

function ReviewerTemplates() {
  return (
    <Routes>
      {/**_cw3 */}
      <Route path={routes.cw3_config} element={<CW3Configurer />} />
      <Route path={routes.cw3_transfer} element={<FundSender />} />
      {/**_cw4 */}
      <Route path={routes.cw4_members} element={<MemberUpdator />} />
    </Routes>
  );
}
