import { useState } from "react";
import {
  WalletState,
  useSetWallet,
} from "contexts/WalletContext/WalletContext";
import Backdrop from "components/Backdrop";
import Copier from "components/Copier";
import Icon from "components/Icon";
import maskAddress from "helpers/maskAddress";
import Filter from "./Filter";
import Holdings from "./Holdings";
import Portal from "./Portal";

const criterionAmount = 0.001;
export default function WalletDetails(props: {
  wallet: WalletState;
  closeHandler: () => void;
}) {
  const { coins, address } = props.wallet;
  const { disconnect } = useSetWallet();
  const [isSmallAmountsShown, setIsSmallAmountShown] = useState(false);

  const filteredCoins = coins.filter((coin) =>
    //show atleast eth
    coin.balance > 0 && isSmallAmountsShown
      ? true
      : +coin.balance > criterionAmount
  );

  const toggleFilter = () => setIsSmallAmountShown((p) => !p);
  const isEmpty = coins.length <= 0;

  return (
    <>
      <Backdrop
        classes="z-10 fixed inset-0"
        customCloseHandler={props.closeHandler}
      />
      <div className="w-max z-50 grid grid-rows-a1a absolute top-full mt-2 bg-white w-full right-0 rounded-md overflow-hidden shadow-lg">
        <div className="bg-angel-grey flex justify-end">
          <button className="text-white p-1" onClick={props.closeHandler}>
            <Icon type="Close" />
          </button>
        </div>
        <div className="bg-angel-grey text-white-grey text-xs p-2 pt-0">
          <p className="uppercase">network : {props.wallet.chain.chain_name}</p>
        </div>
        {!isEmpty && (
          <Filter
            isSmallAmountShown={isSmallAmountsShown}
            toggleFilter={toggleFilter}
          />
        )}
        <div className="flex gap-2 items-center p-2  pb-0">
          <p className="text-xl text-angel-grey">{maskAddress(address)}</p>
          <Copier text={address} colorClass="text-angel-grey text-lg" />
        </div>
        <Portal address={address} />
        {(!isEmpty && <Holdings coins={filteredCoins} />) || (
          <span className="text-angel-grey p-10 text-center text-sm uppercase">
            Wallet is empty
          </span>
        )}
        <button
          onClick={disconnect}
          className="uppercase text-sm bg-angel-orange hover:text-angel-grey p-2 text-white"
        >
          disconnect
        </button>
      </div>
    </>
  );
}
