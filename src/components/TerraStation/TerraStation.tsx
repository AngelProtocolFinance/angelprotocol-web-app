import { ConnectType } from "@terra-money/wallet-provider";
import terraExtIcon from "assets/icons/wallets/terra-extension.jpg";
import terraMobileIcon from "assets/icons/wallets/terra-mobile.png";
import Connector from "./Connector";
import Installer from "./Installer";

type Props = {
  type: ConnectType;
};

export default function TerraStation(props: Props) {
  const title =
    props.type === ConnectType.CHROME_EXTENSION
      ? "Terra Station Extension"
      : "Terra Station Mobile";

  const icon =
    props.type === ConnectType.CHROME_EXTENSION
      ? terraExtIcon
      : terraMobileIcon;

  return (
    <div className="border border-opacity-50 rounded-md flex flex-col items-center">
      <img src={icon} alt="" className="bg-white w-16 h-16 p-3" />
      <Connector type={props.type} />
      <Installer type={props.type} />
      <p className="mt-2 text-white-grey text-center">{title}</p>
    </div>
  );
}
