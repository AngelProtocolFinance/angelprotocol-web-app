import Icon from "components/Icon";
import Members from "./Members";
import Settings from "./Settings";

type Props = {
  tooltip: string;
};

export default function ReadOnlyAdminWallet({ tooltip }: Props) {
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Admin Wallet</h3>
      <div className="flex gap-2 items-center text-orange-d2 dark:text-orange @container border border-orange-l2 dark:border-orange-l3/80 bg-orange-l4 dark:bg-bluegray-d2 text-sm p-3 rounded">
        <Icon type="Info" className="shrink-0 text-2xl @lg:text-base" />
        <span>{tooltip}</span>
      </div>
      <Members />
      <Settings />
    </div>
  );
}
