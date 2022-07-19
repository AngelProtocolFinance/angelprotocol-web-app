import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { setFormError } from "slices/transaction/transactionSlice";
import addNetworkAndSwitch, {
  switchToNetwork,
} from "helpers/addNetworkAndSwitch";

export default function NetworkPrompt() {
  const { isLoading, wallet } = useGetWallet();
  const { watch } = useFormContext<DonateValues>();
  const dispatch = useSetter();
  const token = watch("token");

  async function handleNetworkChange() {
    try {
      if (!wallet) {
        dispatch(setFormError("Wallet is not connected"));
        return;
      }
      if (wallet.chain.type === "evm-native") {
        try {
          /**
           * NOTE: xdefi doesn't propagate error to this scope
           */
          await addNetworkAndSwitch(wallet);
        } catch (err) {
          console.error("add and switch error", err);
          //edge case, network is already in wallet: switch only
          await switchToNetwork(wallet.chain.chain_id, wallet.providerId);
        }
      } else {
        dispatch(
          setFormError("Wallet can only switch to this network manually.")
        );
      }
    } catch (err) {
      console.error("addSwitch and switch error", err);
      dispatch(
        setFormError(
          /**generalize this error, since manifestation is different on wallets
           * metamask: errs code -32603 if network is a default metamask network,
           * but also errs -32603 on other type of error
           *
           * binance-wallet: error message
           */
          "Unknown error: Kindly switch your wallet network manually"
        )
      );
    }
  }

  if (!wallet) {
    return null;
  }

  return (
    <div className="grid bg-amber-400/5 border-2 rounded-md border-amber-400/20 p-1.5 mb-2">
      <p className="text-xs font-mono text-amber-500">
        To transact <span className="font-semibold">{token.symbol}</span>,
        kindly switch wallet network to{" "}
        <span className="text-amber-500 font-semibold">
          {wallet.chain.name}
        </span>
      </p>
      <button
        disabled={isLoading}
        onClick={handleNetworkChange}
        className="justify-self-end text-xs font-bold text-angel-blue hover:text-bright-blue active:text-angel-orange uppercase font-heading"
        type="button"
      >
        {isLoading ? "Switching..." : "Switch to Network"}
      </button>
    </div>
  );
}
