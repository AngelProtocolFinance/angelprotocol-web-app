import { IoClose } from "react-icons/io5";
import Address from "components/TerraStation/Address";
import { useWallet } from "use-wallet";
import { utils } from "ethers";
import Balance from "./Balance";
import { denoms } from "constants/curriencies";
import Backdrop from "components/WalletSuite/Backdrop";
type Props = { closeHandler: () => void };
export default function Details(props: Props) {
  const wallet = useWallet();
  const balance = parseFloat(utils.formatUnits(wallet.balance) || "0");
  const isConnected = wallet.status === "connected";
  function disconnect() {
    wallet.reset();
  }

  return (
    <>
      <div className="z-50 grid grid-rows-a1a absolute top-full mt-2 bg-white w-full left-0 rounded-md overflow-hidden shadow-2xl">
        <button
          className="text-white absolute top-2 right-2"
          onClick={props.closeHandler}
        >
          <IoClose />
        </button>
        <div className="bg-angel-grey text-white-grey uppercase text-sm p-2">
          network : {wallet.networkName}
        </div>
        <Address address={wallet.account || ""} />
        <Balance denom={denoms.ether} amount={balance} />
        <button
          disabled={!isConnected}
          onClick={disconnect}
          className="uppercase text-sm bg-blue-accent hover:bg-angel-blue p-2 text-white"
        >
          disconnect
        </button>
      </div>
      <Backdrop closeHandler={props.closeHandler} />
    </>
  );
}
