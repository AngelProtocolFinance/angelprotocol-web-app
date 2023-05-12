import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import { templateRoutes as routes } from "../../constants";
import Config from "../../templates/cw3/Config";
import FundSender from "../../templates/cw3/FundSender";
import Members from "../../templates/cw4/Members";
import Seo from "../Seo";
import Nav from "./Nav";

export default function Templates() {
  return (
    <div className="grid gap-2 grid-cols-[auto_1fr] mt-2">
      <Seo title="Templates" url={adminRoutes.templates} />
      <Nav />
      <Routes>
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
