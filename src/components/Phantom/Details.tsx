import { IoClose } from "react-icons/io5";
import Address from "components/TerraStation/Address";
import Balance from "./Balance";
import { denoms } from "constants/currency";
import Backdrop from "components/WalletSuite/Backdrop";
import Disconnect from "components/WalletSuite/Disconnect";
import { useGetPhantom, useSetPhantom } from "wallets/Phantom";
type Props = { closeHandler: () => void };
export default function Details(props: Props) {
  const { disconnect } = useSetPhantom();
  const { address, connected, balance } = useGetPhantom();
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
          network : dev-net
        </div>
        <Address address={address} />
        <Balance denom={denoms.sol} amount={balance / 1e9} />
        <Disconnect disabled={!connected} disconnect={disconnect} />
      </div>
      <Backdrop closeHandler={props.closeHandler} />
    </>
  );
}
