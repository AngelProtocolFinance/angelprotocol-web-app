import Members from "./Members";
import Settings from "./Settings";

export default function AdminWallet() {
  return (
    <div className="grid content-start gap-y-8">
      <h3 className="text-[2rem]">Admin Wallet</h3>
      <Members />
      <Settings />
    </div>
  );
}
