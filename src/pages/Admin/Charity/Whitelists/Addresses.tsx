import { useAdminContext } from "pages/Admin/Context";
import { ReadOnlyAddresses } from "components/Addresses";
import { Tooltip } from "components/admin";

type Props = { tooltip: string };
export default function Addresses({ tooltip }: Props) {
  const { allowlistedBeneficiaries, allowlistedContributors } =
    useAdminContext<"charity">();
  return (
    <div className={`w-full mb-2`}>
      <Tooltip tooltip={tooltip} classes="mb-8" />
      <ReadOnlyAddresses
        addresses={allowlistedContributors}
        memberName="contributor"
        title="Contributors"
        emptyMsg="Anyone can contribute to your AST."
        classes="mb-8 bg-white dark:bg-blue-d6 p-4 md:p-8"
      />
      <ReadOnlyAddresses
        addresses={allowlistedBeneficiaries}
        memberName="beneficiary"
        title="Beneficiaries"
        emptyMsg="Only the multisig wallet is allowed to withdraw funds"
        classes="mb-8 bg-white dark:bg-blue-d6 p-4 md:p-8"
      />
    </div>
  );
}
