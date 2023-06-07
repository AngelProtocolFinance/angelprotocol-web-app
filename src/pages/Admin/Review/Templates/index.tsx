import { Route, Routes } from "react-router-dom";
import Seo from "components/Seo";
import { APP_NAME, DAPP_URL } from "constants/env";
import { adminRoutes } from "constants/routes";
import { templateRoutes as routes } from "../../constants";
import Config from "../../templates/cw3/Config";
import FundSender from "../../templates/cw3/FundSender";
import Nav from "./Nav";

export default function Templates() {
  return (
    <div className="grid gap-2 grid-cols-[auto_1fr]">
      <Seo
        title={`Templates - ${APP_NAME}`}
        url={`${DAPP_URL}/${adminRoutes.templates}`}
      />

      <Nav />
      <Routes>
        {/**_cw3 */}
        <Route
          path={routes["multisig.fund-transfer"]}
          element={<FundSender />}
        />
        <Route path={routes["multisig.config"]} element={<Config />} />
        {/**_cw4 */}
      </Routes>
    </div>
  );
}
