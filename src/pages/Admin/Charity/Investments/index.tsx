import { Route, Routes } from "react-router-dom";
import { investmentRoutes } from "constants/routes";
import Balances from "./Balances";
import InvestRedeem from "./InvestRedeem";
import Nav from "./Nav";
import Strategies from "./Strategies";
import Withdraw from "./Widthdraw";

export default function Investments() {
  return (
    <div className="grid grid-rows-[auto_1fr] mt-4">
      <Nav classes="mb-4" />
      <Routes>
        <Route path={investmentRoutes.strategies} element={<Strategies />} />
        <Route path={investmentRoutes.withdraw} element={<Withdraw />} />
        <Route
          path={investmentRoutes.invest_redeem}
          element={<InvestRedeem />}
        />
        <Route index element={<Balances />} />
      </Routes>
    </div>
  );
}
