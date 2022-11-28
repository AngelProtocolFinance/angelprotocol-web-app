import { Route, Routes } from "react-router-dom";
import ReviewCW3Configurer from "pages/Admin/templates/cw3/ReviewCW3Configurer";
import { templateRoutes as routes } from "../../constants";
import FundSender from "../../templates/cw3/FundSender";
import Members from "../../templates/cw4/Members";
import Nav from "./Nav";

export default function Templates() {
  return (
    <div className="grid gap-2 grid-cols-[auto_1fr]">
      <Nav />
      <Routes>
        {/**_cw3 */}
        <Route path={routes.cw3_config} element={<ReviewCW3Configurer />} />
        <Route path={routes.cw3_transfer} element={<FundSender />} />
        {/**_cw4 */}
        <Route path={routes.cw4_members} element={<Members />} />
      </Routes>
    </div>
  );
}
