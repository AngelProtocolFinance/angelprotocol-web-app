import { useAdminResources } from "pages/Admin/Guard";

export default function Strategies() {
  const { endowment } = useAdminResources();

  // if (
  //   endowment.strategies.liquid.length <= 0 &&
  //   endowment.strategies.locked.length <= 0
  // ) {
  //   return <div>add a strategy</div>;
  // }

  return <div>strategies</div>;
}

interface StrategyComponent {
  vault: string; // Vault SC Address
  percentage: string; // percentage of funds to invest
}

interface AccountStrategies {
  locked: StrategyComponent[];
  liquid: StrategyComponent[];
}

const strategies: AccountStrategies = {
  locked: [
    { vault: "a", percentage: "0.5" },
    { vault: "b", percentage: "0.5" },
  ],
  liquid: [
    { vault: "a", percentage: "0.5" },
    { vault: "b", percentage: "0.5" },
  ],
};
