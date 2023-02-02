import { Route, Routes } from "react-router-dom";
import { investmentRoutes } from "constants/routes";
import Balances from "./Balances";
import InvestRedeem from "./InvestRedeem";
import Nav from "./Nav";

export default function Investments() {
  return (
    <div className="grid grid-rows-[auto_1fr] mt-4">
      <Nav classes="grid mb-4" />
      <Routes>
        <Route
          path={investmentRoutes.invest_redeem}
          element={<InvestRedeem />}
        />
        <Route index element={<Balances />} />
      </Routes>
    </div>
  );
}
