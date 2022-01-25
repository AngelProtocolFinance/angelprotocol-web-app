import { ConnectType } from "@terra-money/wallet-provider";
import { icons } from "components/WalletSuite/Icon";
import { Icons } from "components/WalletSuite/types";
import useTerraAction from "./useTerraAction";

type Props = {
  type: ConnectType;
  label: string;
  icon: Icons;
};

export default function TerraAction(props: Props) {
  const { handleClick, isAvailable, isLoading } = useTerraAction(props.type);

  if (!isAvailable) {
    return null;
  }

  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className="transform active:translate-x-1 bg-thin-blue disabled:bg-grey-accent text-angel-grey hover:bg-angel-blue hover:text-white flex items-center gap-2 rounded-full items-center p-1 pr-4 shadow-md"
    >
      <img
        src={icons[props.icon]}
        className="w-8 h-8 p-1.5 bg-white-grey rounded-full shadow-md"
        alt=""
      />
      <p className="uppercase text-sm text-white">{props.label}</p>
    </button>
  );
}
