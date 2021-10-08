import { ConnectType } from "@terra-dev/use-wallet";
import terraExtIcon from "assets/icons/wallets/terra-extension.jpg";
import Connector from "./Connector";
import Installer from "./Installer";

export default function Extension() {
  return (
    <div className="flex flex-col items-center">
      <img
        src={terraExtIcon}
        alt=""
        className="bg-white p-4 w-16 h-16 rounded-full"
      />
      <p className="mt-2 text-white-grey text-opacity-50">
        Terra Station Extension
      </p>
      <Connector type={ConnectType.CHROME_EXTENSION} />
      <Installer type={ConnectType.CHROME_EXTENSION} />
    </div>
  );
}
