import { useAdminContext } from "pages/Admin/Context";
import Members from "./Members";
import ReadOnlyAdminWallet from "./ReadOnlyAdminWallet/ReadOnlyAdminWallet";
import Settings from "./Settings";

export default function AdminWallet() {
  const { txResource } = useAdminContext();

  if (typeof txResource === "string") {
    return <ReadOnlyAdminWallet />;
  }

  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Admin Wallet</h3>
      <Members />
      <Settings />
    </div>
  );
}
