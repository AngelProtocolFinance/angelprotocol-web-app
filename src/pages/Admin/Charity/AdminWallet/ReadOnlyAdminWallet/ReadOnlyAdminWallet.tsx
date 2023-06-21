import { Tooltip } from "components/admin";
import Members from "./Members";
import Settings from "./Settings";

type Props = {
  tooltip: string;
};

export default function ReadOnlyAdminWallet({ tooltip }: Props) {
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Admin Wallet</h3>
      <Tooltip tooltip={tooltip} />
      <Members />
      <Settings />
    </div>
  );
}
