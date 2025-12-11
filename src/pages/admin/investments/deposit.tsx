import { DepositForm } from "../shared/deposit-form";
import { use_admin_data } from "../use-admin-data";

export default function Page() {
  const data = use_admin_data();
  // Format NPO name for memo: replace spaces with underscores, uppercase
  const npo_name = (data?.endow.name ?? "")
    .toUpperCase()
    .replace(/\s+/g, "_")
    .slice(0, 30);
  const npo_id = String(data?.id ?? "");

  return (
    <DepositForm
      account_type="investments"
      npo_name={npo_name}
      npo_id={npo_id}
    />
  );
}
