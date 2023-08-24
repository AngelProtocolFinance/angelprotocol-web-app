import { useAdminContext } from "../../Context";
import Allowlist from "../common/Allowlist";

export default function Whitelists() {
  const { allowlistedBeneficiaries, allowlistedContributors } =
    useAdminContext<"charity">();

  return (
    <>
      <h2 className="text-[2rem] font-bold mb-10">Whitelists</h2>
      <Allowlist
        operation="allowlistedContributors"
        type="contributor"
        memberName="contributor"
        title="Contributors"
        emptyMessage="Anyone can contribute to your AST."
        initial={allowlistedContributors}
        classes="mb-10"
      />
      <Allowlist
        operation="allowlistedBeneficiaries"
        type="beneficiary"
        memberName="beneficiary"
        title="Beneficiaries"
        emptyMessage="Only the multisig wallet is allowed to withdraw funds."
        initial={allowlistedBeneficiaries}
      />
    </>
  );
}
