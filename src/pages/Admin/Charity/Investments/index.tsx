import { Investments as InvestmentsMobileNavPortal } from "App/Header/MobileNav/portals/admin";
import { Route, Routes } from "react-router-dom";
import { useAdminResources } from "pages/Admin/Guard";
import { investmentRoutes } from "constants/routes";
import Balances from "./Balances";
import InvestRedeem from "./InvestRedeem";
import Nav from "./Nav";
import Strategies from "./Strategies";

export default function Investments() {
  const { endowmentId } = useAdminResources();
  return (
    <div className="grid grid-rows-[auto_1fr] mt-4">
      <Nav classes="hidden lg:grid mb-4" />
      <div className="block md:hidden">
        <InvestmentsMobileNavPortal id={endowmentId} />
      </div>
      <Routes>
        <Route path={investmentRoutes.strategies} element={<Strategies />} />
        <Route
          path={investmentRoutes.invest_redeem}
          element={<InvestRedeem />}
        />
        <Route index element={<Balances />} />
      </Routes>
    </div>
  );
}
