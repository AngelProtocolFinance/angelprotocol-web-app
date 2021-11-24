import { IoClose } from "react-icons/io5";
import Address from "components/TerraStation/Address";
import { useWallet } from "use-wallet";
import { utils } from "ethers";
import { denoms } from "constants/currency";
import Backdrop from "components/WalletSuite/Backdrop";
import Disconnect from "components/WalletSuite/Disconnect";
import Balance from "components/WalletSuite/Balance";
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
        <Balance denom={denoms.ether} amount={balance} precision={6} />
        <Disconnect disabled={!isConnected} disconnect={disconnect} />
      </div>
      <Backdrop closeHandler={props.closeHandler} />
    </>
  );
}
