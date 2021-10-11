import { ConnectType } from "@terra-dev/use-wallet";
import TerraStation from "components/TerraStation/TerraStation";
import { IoClose } from "react-icons/io5";

type Props = {
  closeHandler: () => void;
};

export default function Connectors(props: Props) {
  return (
    <div className="absolute top-full right-0 flex gap-4 bg-white bg-opacity-5 p-4 pt-8 mt-2 rounded-md">
      <button className="absolute top-2 right-2" onClick={props.closeHandler}>
        <IoClose className="text-white-grey text-lg" />
      </button>
      <TerraStation type={ConnectType.CHROME_EXTENSION} />
      <TerraStation type={ConnectType.WALLETCONNECT} />
    </div>
  );
}
