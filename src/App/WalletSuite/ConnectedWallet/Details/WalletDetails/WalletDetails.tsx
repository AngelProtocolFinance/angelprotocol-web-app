import { WalletState } from "contexts/WalletContext";
import Copier from "components/Copier";
import Balances from "./Balances";

export default function WalletDetails(props: WalletState) {
  return (
    <div className="grid gap-3 p-4 border-b border-gray-l2">
      <Balances coins={props.coins} />
      <div className="flex items-center justify-between w-full gap-2 p-4 pl-3 bg-gray-l4 border border-gray-l2 rounded">
        <span className="max-w-[75vw] sm:w-56 font-body font-normal text-sm truncate hover:cursor-default">
          {props.address}
        </span>
        <Copier text={props.address} classes="w-6 h-6 hover:text-orange" />
      </div>
      {/* For now just a label until it is decided what exactly needs to be displayed here, see this comment:
      https://app.clickup.com/t/3rcffb9?comment=1134342876&threadedComment=1134387996*/}
      <div className="flex items-center p-4 pl-3 border border-gray-l2 rounded">
        {props.chain.chain_name}
      </div>
    </div>
  );
}
