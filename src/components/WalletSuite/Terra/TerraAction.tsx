import { Connection } from "@terra-money/wallet-provider";
import useTerraAction from "./useTerraAction";

export default function TerraAction(props: Connection) {
  const { handleClick, isUpdating } = useTerraAction(props);

  return (
    <button
      disabled={isUpdating}
      onClick={handleClick}
      className="transform active:translate-x-1 bg-thin-blue disabled:bg-grey-accent text-angel-grey hover:bg-angel-blue hover:text-white flex items-center gap-2 rounded-full items-center p-1 pr-4 shadow-md"
    >
      <img
        src={props.icon}
        className="w-8 h-8 p-1.5 bg-white-grey rounded-full shadow-md"
        alt=""
      />
      <p className="uppercase text-sm text-white">{props.name}</p>
    </button>
  );
}
