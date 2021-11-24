import { IoClose } from "react-icons/io5";
import Address from "components/TerraStation/Address";
import { denoms } from "constants/currency";
import Backdrop from "components/WalletSuite/Backdrop";
import Disconnect from "components/WalletSuite/Disconnect";
import Balance from "components/WalletSuite/Balance";
import { useGetKeplr, useSetKeplr } from "wallets/Keplr";
import { chains } from "contracts/types";
type Props = { closeHandler: () => void };
export default function Details(props: Props) {
  const { disconnect } = useSetKeplr();
  const { address, connected, balance } = useGetKeplr();
  const disp_balance = +balance[0]?.amount || 0;
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
          {chains.cosmos_4}
        </div>
        <Address address={address} />
        <Balance
          denom={denoms.uatom}
          amount={disp_balance / 1e6}
          precision={6}
        />
        <Disconnect disabled={!connected} disconnect={disconnect} />
      </div>
      <Backdrop closeHandler={props.closeHandler} />
    </>
  );
}
