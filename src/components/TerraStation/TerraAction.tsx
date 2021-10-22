import { ConnectType } from "@terra-money/wallet-provider";
import useTerraAction from "./useTerraAction";

type Props = {
  type: ConnectType;
  label: string;
  icon: string;
};

export default function TerraAction(props: Props) {
  const { handleClick, isAvailable } = useTerraAction(props.type);

  if (!isAvailable) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className={`transform active:translate-x-1 hover:bg-white flex items-center gap-2 rounded-full pitems-center bg-thin-grey p-1 pr-4 shadow-md`}
    >
      <img
        src={props.icon}
        className="w-8 h-8 p-2 bg-white rounded-full shadow-md"
        alt=""
      />
      <p className="uppercase text-angel-grey text-sm ">{props.label}</p>
    </button>
  );
}
