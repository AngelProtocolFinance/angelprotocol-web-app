import { ConnectType } from "@terra-money/wallet-provider";
import TerraAction from "components/TerraStation/TerraAction";
import { IoClose } from "react-icons/io5";
import Action from "components/Ethereum/Action";
import { Connectors as Connects, Icons } from "./types";
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
        icon={Icons.terra_ext}
        type={ConnectType.CHROME_EXTENSION}
        label="Terra Station Extension"
      />
      <TerraAction
        icon={Icons.terra_mobile}
        type={ConnectType.WALLETCONNECT}
        label="Terra Station Mobile"
      />
      <Action type={Connects.injected} label="Metamask" icon={Icons.metamask} />
      <Action type={Connects.injected} label="XDEFI" icon={Icons.xdefi} />
      <Action type={Connects.torus} label="Torus" icon={Icons.torus} />
      <Action type={Connects.ledger} label="Ledger" icon={Icons.ledger} />
    </div>
  );
}
