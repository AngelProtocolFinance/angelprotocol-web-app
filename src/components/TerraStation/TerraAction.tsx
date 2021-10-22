import { ConnectType } from "@terra-money/wallet-provider";
import useTerraAction from "./useTerraAction";

type Props = {
  type: ConnectType;
  label: string;
  icon: string;
};

export default function TerraAction(props: Props) {
  const { handleClick, isInstallable } = useTerraAction(props.type);
  return (
    <button
      onClick={handleClick}
      style={{ backgroundImage: `url(${props.icon})`, backgroundSize: "40%" }}
      className={`items-center w-32 h-32 flex flex-col bg-white bg-contain bg-no-repeat bg-center rounded-md shadow-md transform active:translate-y-0.5`}
    >
      <p className="text-white font-bold font-heading leading-normal text-xs uppercase text-center bg-angel-blue bg-opacity-70 p-2">
        {props.label}
      </p>
      <p className="mt-auto pb-1 uppercase text-sm text-blue-accent font-bold bg-angel">
        {isInstallable ? "install" : "connect"}
      </p>
    </button>
  );
}
