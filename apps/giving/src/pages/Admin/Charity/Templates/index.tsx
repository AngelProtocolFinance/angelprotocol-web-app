import { Route, Routes } from "react-router-dom";
import { templateRoutes as routes } from "../../constants";
import Config from "../../templates/cw3/Config";
import FundSender from "../../templates/cw3/FundSender";
import Members from "../../templates/cw4/Members";
import Nav from "./Nav";

export default function Templates() {
  return (
    <div className="grid gap-2 grid-cols-[auto_1fr] mt-2">
      <Nav />
      <Routes>
        {/**_cw3 */}
        <Route path={routes.cw3_config} element={<Config />} />
        <Route path={routes.cw3_transfer} element={<FundSender />} />

        {/**_cw4 */}
        <Route path={routes.cw4_members} element={<Members />} />
      </Routes>
    </div>
  );
}
