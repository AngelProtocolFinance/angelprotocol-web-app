import Members from "./Members";
import Settings from "./Settings";

export default function AdminWallet() {
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Admin Wallet</h3>
      <Members />
      <Settings />
    </div>
  );
}
