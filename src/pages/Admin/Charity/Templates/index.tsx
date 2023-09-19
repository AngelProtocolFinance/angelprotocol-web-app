import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "constant/routes";
import { templateRoutes as routes } from "../../constants";
import FundSender from "../../templates/cw3/FundSender";
import Seo from "../Seo";
import Nav from "./Nav";

export default function Templates() {
  return (
    <div className="grid gap-2 grid-cols-[auto_1fr] mt-2">
      <Seo title="Templates" url={adminRoutes.templates} />
      <Nav />
      <Routes>
        <Route
          path={routes["multisig.fund-transfer"]}
          element={<FundSender />}
        />
      </Routes>
    </div>
  );
}
