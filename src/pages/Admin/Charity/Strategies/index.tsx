import { useAdminResources } from "pages/Admin/Guard";

export default function Strategies() {
  const { endowment } = useAdminResources();

  if (
    endowment.strategies.liquid.length <= 0 &&
    endowment.strategies.locked.length <= 0
  ) {
    return <div>add a strategy</div>;
  }

  return <div></div>;
}
