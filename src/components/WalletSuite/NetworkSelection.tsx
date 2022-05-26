import {
  useGetWallet,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import { NativeTokenWithBalance } from "contexts/WalletContext/types";
import Backdrop from "components/Backdrop";
import Icon from "components/Icon";

export default function NetworkSelection(props: { closeHandler: () => void }) {
  const { coins } = useGetWallet();
  const { disconnect, networkSwitcher } = useSetWallet();

  return (
    <>
      <Backdrop
        classes="z-10 fixed inset-0"
        customCloseHandler={props.closeHandler}
      />
      <div className="w-max z-50 grid content-start absolute top-full mt-2 bg-white w-full right-0 rounded-md overflow-hidden shadow-lg">
        <div className="bg-angel-grey flex justify-end">
          <button className="text-white p-1 pb-0" onClick={props.closeHandler}>
            <Icon type="Close" />
          </button>
        </div>
        <p className="bg-angel-grey text-white-grey text-sm p-2 pt-0">
          Please select network
        </p>
        {coins.map((coin) => (
          <NetworkOption
            key={coin.chainId}
            {...coin}
            switchNetwork={networkSwitcher(coin)}
          />
        ))}
        <button
          onClick={disconnect}
          className="uppercase text-sm bg-angel-orange hover:text-angel-grey p-2 mt-2 text-white"
        >
          disconnect
        </button>
      </div>
    </>
  );
}

function NetworkOption({
  switchNetwork,
  ...coin
}: NativeTokenWithBalance & { switchNetwork(): Promise<void> }) {
  return (
    <button
      onClick={switchNetwork}
      className="flex items-center hover:bg-angel-blue/10 active:bg-angel-blue/30 gap-2 p-2 mt-2 mx-2 rounded-md border border-angel-blue/30"
    >
      <img src={coin.logo} alt="" className="w-6 h-6 object-contain" />
      <p className="text-angel-grey text-sm">{coin.chainName}</p>
    </button>
  );
}
