import { useFormContext } from "react-hook-form";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { setFormError } from "slices/transaction/transactionSlice";
import addNetworkAndSwitch, {
  switchToNetwork,
} from "helpers/addNetworkAndSwitch";
import { DonateValues } from "../types";

export default function NetworkPrompt() {
  const { chainId, isWalletLoading, providerId } = useGetWallet();
  const { watch } = useFormContext<DonateValues>();
  const dispatch = useSetter();
  const token = watch("token");
  const isInCorrectNetwork = token.chain_id === chainId;

  async function handleNetworkChange() {
    try {
      if (providerId === "unknown") {
        dispatch(setFormError("Wallet is not connected"));
        return;
      }
      if (token.type === "evm-native") {
        try {
          /**
           * NOTE: xdefi doesn't propagate error to this scope
           */
          await addNetworkAndSwitch(token, providerId);
        } catch (err) {
          console.error("add and switch error", err);
          //edge case, network is already in wallet: switch only
          await switchToNetwork(token.chain_id, providerId);
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

  if (isInCorrectNetwork || providerId === "unknown") {
    return null;
  }

  return (
    <div className="grid bg-amber-400/5 border-2 rounded-md border-amber-400/20 p-1.5 mb-2">
      <p className="text-xs font-mono text-amber-500">
        To transact <span className="font-semibold">{token.symbol}</span>,
        kindly switch wallet network to{" "}
        <span className="text-amber-500 font-semibold">{token.chain_name}</span>
      </p>
      <button
        disabled={isWalletLoading}
        onClick={handleNetworkChange}
        className="justify-self-end text-xs font-bold text-angel-blue hover:text-bright-blue active:text-angel-orange uppercase font-heading"
        type="button"
      >
        {isWalletLoading ? "Switching..." : "Switch to Network"}
      </button>
    </div>
  );
}
