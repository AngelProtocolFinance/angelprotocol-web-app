import { ConnectType } from "@terra-money/wallet-provider";
import TerraAction from "components/TerraStation/TerraAction";
import terraMobileIcon from "assets/icons/wallets/terra-mobile.png";
import terraExtIcon from "assets/icons/wallets/terra-extension.jpg";
import { IoClose } from "react-icons/io5";
import Action from "components/Metamask/Action";

type Props = {
  closeHandler: () => void;
};

export default function Connectors(props: Props) {
  return (
    <div className="w-72 absolute top-full right-0 flex flex-col gap-4 bg-blue-accent p-4 pt-4 mt-2 rounded-md shadow-lg z-50">
      <p className="uppercase font-heading text-white font-bold">
        Choose wallet
      </p>
      <button className="absolute top-2 right-2" onClick={props.closeHandler}>
        <IoClose className="text-white-grey text-lg" />
      </button>
      <TerraAction
        icon={terraExtIcon}
        type={ConnectType.CHROME_EXTENSION}
        label="Terra Station Extension"
      />
      <TerraAction
        icon={terraMobileIcon}
        type={ConnectType.WALLETCONNECT}
        label="Terra Station Mobile"
      />
      <Action />
    </div>
  );
}
