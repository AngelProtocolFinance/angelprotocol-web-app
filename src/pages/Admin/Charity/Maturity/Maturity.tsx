import { useAdminContext } from "pages/Admin/Context";
import Allowlist from "../common/Allowlist";
import MaturityDate from "./MaturityDate";

export default function Maturity() {
  const { maturityAllowlist, maturityTime } = useAdminContext<"charity">();
  return (
    <div className="@container grid content-start gap-8">
      <h2 className="text-[2rem]">Maturity</h2>
      <MaturityDate />
      {maturityTime ? (
        <Allowlist
          operation="maturityAllowlist"
          type="maturity"
          memberName="beneficiary"
          title="Beneficiary Whitelist at Maturity"
          emptyMessage="Multisig wallet is the only beneficiary"
          initial={maturityAllowlist}
        />
      ) : null}
    </div>
  );
}
