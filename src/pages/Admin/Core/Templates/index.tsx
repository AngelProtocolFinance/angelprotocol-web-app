import { Route, Routes } from "react-router-dom";
import { templateRoutes as routes } from "../../constants";
import Config from "../../templates/cw3/Config";
import FundSender from "../../templates/cw3/FundSender";
import Members from "../../templates/cw4/Members";
import Alliance from "./indexfund/Alliance";
import FundConfig from "./indexfund/Config";
import CreateFund from "./indexfund/CreateFund";
import IndexFundOwner from "./indexfund/IndexFundOwner/IndexFundOwner";
import FundMembers from "./indexfund/Members";
import RemoveFund from "./indexfund/RemoveFund";
import RegistrarConfig from "./registrar/Config";
import EndowmentStatus from "./registrar/EndowmentStatus";
import RegistrarOwner from "./registrar/Owner";

export default function Templates() {
  return (
    <Routes>
      {/** _index-fund */}
      <Route path={routes.if_alliance} element={<Alliance />} />
      <Route path={routes.if_create} element={<CreateFund />} />
      <Route path={routes.if_remove} element={<RemoveFund />} />
      <Route path={routes.if_members} element={<FundMembers />} />
      <Route path={routes.if_config} element={<FundConfig />} />
      <Route path={routes.if_owner} element={<IndexFundOwner />} />

      {/** _registrar */}
      <Route path={routes.reg_endow_status} element={<EndowmentStatus />} />
      <Route path={routes.reg_config} element={<RegistrarConfig />} />
      <Route path={routes.reg_owner} element={<RegistrarOwner />} />

      {/**_cw3 */}
      <Route path={routes.cw3_config} element={<Config />} />
      <Route path={routes.cw3_transfer} element={<FundSender />} />

      {/**_cw4 */}
      <Route path={routes.cw4_members} element={<Members />} />
    </Routes>
  );
}
