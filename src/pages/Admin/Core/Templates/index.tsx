import { Route, Routes } from "react-router-dom";
import Seo from "components/Seo";
import { APP_NAME, DAPP_URL } from "constant/env";
import { adminRoutes } from "constant/routes";
import { templateRoutes as routes } from "../../constants";
import FundSender from "../../templates/cw3/FundSender";
import Nav from "./Nav";
import FundConfig from "./index-fund/Config";
import CreateFund from "./index-fund/CreateFund";
import FundMembers from "./index-fund/Members";
import RemoveFund from "./index-fund/RemoveFund";
import RegistrarConfigExtension from "./registrar/ConfigExtension";
import RegistrarOwner from "./registrar/Owner";
import Token from "./registrar/Token";

export default function Templates() {
  return (
    <div className="grid gap-2 grid-cols-[auto_1fr]">
      <Seo
        title={`Templates - ${APP_NAME}`}
        url={`${DAPP_URL}/${adminRoutes.templates}`}
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

        {/** _registrar */}
        <Route
          path={routes["registrar.update-config"]}
          element={<RegistrarConfigExtension />}
        />
        <Route
          path={routes["registrar.update-owner"]}
          element={<RegistrarOwner />}
        />
        <Route path={routes["registrar.add-token"]} element={<Token />} />

        {/**_multisig */}
        <Route
          path={routes["multisig.fund-transfer"]}
          element={<FundSender />}
        />
      </Routes>
    </div>
  );
}
