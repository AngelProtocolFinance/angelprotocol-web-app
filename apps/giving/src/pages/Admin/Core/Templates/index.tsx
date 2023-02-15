import { Route, Routes } from "react-router-dom";
import { templateRoutes as routes } from "../../constants";
import Config from "../../templates/cw3/Config";
import FundSender from "../../templates/cw3/FundSender";
import Members from "../../templates/cw4/Members";
import Nav from "./Nav";
import Alliance from "./index-fund/Alliance";
import FundConfig from "./index-fund/Config";
import CreateFund from "./index-fund/CreateFund";
import IndexFundOwner from "./index-fund/IndexFundOwner";
import FundMembers from "./index-fund/Members";
import RemoveFund from "./index-fund/RemoveFund";
import RegistrarConfig from "./registrar/Config";
import RegistrarOwner from "./registrar/Owner";

export default function Templates() {
  return (
    <div className="grid gap-2 grid-cols-[auto_1fr]">
      <Nav />
      <Routes>
        {/** _index-fund */}
        <Route path={routes.if_alliance} element={<Alliance />} />
        <Route path={routes.if_create} element={<CreateFund />} />
        <Route path={routes.if_remove} element={<RemoveFund />} />
        <Route path={routes.if_members} element={<FundMembers />} />
        <Route path={routes.if_config} element={<FundConfig />} />
        <Route path={routes.if_owner} element={<IndexFundOwner />} />

        {/** _registrar */}
        <Route path={routes.reg_config} element={<RegistrarConfig />} />
        <Route path={routes.reg_owner} element={<RegistrarOwner />} />

        {/**_cw3 */}
        <Route path={routes.cw3_config} element={<Config />} />
        <Route path={routes.cw3_transfer} element={<FundSender />} />

        {/**_cw4 */}
        <Route path={routes.cw4_members} element={<Members />} />
      </Routes>
    </div>
  );
}
