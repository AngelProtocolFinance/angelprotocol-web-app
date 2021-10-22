import { ConnectType } from "@terra-money/wallet-provider";
import TerraAction from "components/TerraStation/TerraAction";
import terraMobileIcon from "assets/icons/wallets/terra-mobile.png";
import terraExtIcon from "assets/icons/wallets/terra-extension.jpg";
import { IoClose } from "react-icons/io5";

type Props = {
  closeHandler: () => void;
};

export default function Connectors(props: Props) {
  return (
    <div className="absolute top-full right-0 flex gap-4 bg-blue-accent  p-4 pt-8 mt-2 rounded-md shadow-lg z-50">
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
      {/* <TerraStation type={ConnectType.CHROME_EXTENSION} /> */}
      {/* <TerraStation type={ConnectType.WALLETCONNECT} /> */}
    </div>
  );
}
