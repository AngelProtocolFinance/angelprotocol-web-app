import Members from "./Members";
import Settings from "./Settings";

export default function AdminWallet() {
  return (
    <div>
      <h3 className="text-[2rem] mb-8">Admin Wallet</h3>
      <Members />
      <Settings />
    </div>
  );
}
