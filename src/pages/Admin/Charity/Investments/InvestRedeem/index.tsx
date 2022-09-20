import Invest from "./Invest";

export default function InvestRedeem() {
  return (
    <div className="grid content-start text-zinc-50/80">
      <h3 className="uppercase font-heading text-2xl font-bold">
        Invest and redeem from vaults
      </h3>
      <p className="mb-6">
        manage your endowment investments by moving funds to/from vaults and the
        free tokens on hand account
      </p>
      <Invest />
    </div>
  );
}
