import { Route, Routes } from "react-router-dom";
import Seo from "components/Seo";
import { APP_NAME, DAPP_DOMAIN } from "constants/common";
import { adminRoutes } from "constants/routes";
import { templateRoutes as routes } from "../../constants";
import Config from "../../templates/cw3/Config";
import FundSender from "../../templates/cw3/FundSender";
import Members from "../../templates/cw4/Members";
import Nav from "./Nav";
import FundConfig from "./index-fund/Config";
import CreateFund from "./index-fund/CreateFund";
import IndexFundOwner from "./index-fund/IndexFundOwner";
import FundMembers from "./index-fund/Members";
import RemoveFund from "./index-fund/RemoveFund";
import RegistrarConfigExtension from "./registrar/ConfigExtension";
import RegistrarOwner from "./registrar/Owner";

export default function Templates() {
  return (
    <div className="grid gap-2 grid-cols-[auto_1fr]">
      <Seo
        title={`Templates - ${APP_NAME}`}
        url={`${DAPP_DOMAIN}/${adminRoutes.templates}`}
      />
      <Nav />
      <Routes>
        {/** _index-fund */}
        <Route
          path={routes["index-fund.create-fund"]}
          element={<CreateFund />}
        />
        <Route
          path={routes["index-fund.remove-fund"]}
          element={<RemoveFund />}
        />
        <Route
          path={routes["index-fund.update-members"]}
          element={<FundMembers />}
        />
        <Route path={routes["index-fund.config"]} element={<FundConfig />} />
        <Route
          path={routes["index-fund.update-owner"]}
          element={<IndexFundOwner />}
        />

        {/** _registrar */}
        <Route
          path={routes["registrar.update-config"]}
          element={<RegistrarConfigExtension />}
        />
        <Route
          path={routes["registrar.update-owner"]}
          element={<RegistrarOwner />}
        />

        {/**_cw3 */}
        <Route path={routes["multisig.config"]} element={<Config />} />
        <Route
          path={routes["multisig.fund-transfer"]}
          element={<FundSender />}
        />

        {/**_cw4 */}
        <Route path={routes["multisig.owners"]} element={<Members />} />
      </Routes>
    </div>
  );
}
