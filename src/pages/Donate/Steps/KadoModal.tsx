import { Dialog } from "@headlessui/react";
import { useCallback, useState } from "react";
import { apesTags, invalidateApesTags } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Loader from "components/Loader";
import { useSetter } from "store/accessors";
import { logger } from "helpers";
import { chainIDs } from "constants/chains";

type KADO_NETWORK_VALUES = "ethereum" | "juno" | "terra";

export default function KadoModal() {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useSetter();
  const { onModalClose } = useModalContext();

  const { wallet } = useGetWallet();

  const handleOnLoad = useCallback(() => {
    // there is a high chance the user bought some new crypto prior to closing this modal
    // reload the page to get new wallet balances
    onModalClose(() => dispatch(invalidateApesTags([apesTags.chain])));
    setLoading(false);
  }, [onModalClose, dispatch]);

  const onToAddress = !wallet ? "" : `&onToAddress=${wallet.address}`;
  const network = !wallet
    ? ""
    : `&network=${getKadoNetworkValue(wallet.chain.chain_id)}`;

  return (
    <Dialog.Panel className="fixed inset-0 sm:fixed-center z-10 sm:w-[500px] sm:h-[700px] bg-gray-l5 dark:bg-blue-d6 sm:border border-gray-l2 dark:border-bluegray sm:rounded">
      {isLoading && (
        <Loader
          bgColorClass="bg-blue dark:bg-white"
          gapClass="gap-2"
          widthClass="w-4"
        />
      )}
      <iframe
        src={`https://app.kado.money?apiKey=${process.env.REACT_APP_KADO_API_KEY}&onPayCurrency=USD&onRevCurrency=USDC&onPayAmount=100${onToAddress}&cryptoList=USDC&fiatList=USD${network}&product=BUY`}
        className={`${
          isLoading ? "hidden" : ""
        } w-full h-full border-none rounded`}
        title="Buy with Kado"
        onLoad={handleOnLoad}
      ></iframe>
    </Dialog.Panel>
  );
}

function getKadoNetworkValue(chainId: string): KADO_NETWORK_VALUES {
  switch (chainId) {
    // if Binance, just default to ethereum
    case chainIDs.binanceMain:
    case chainIDs.ethMain:
      return "ethereum";
    case chainIDs.junoMain:
      return "juno";
    case chainIDs.terraMain:
      return "terra";
    default:
      logger.error(`${chainId} is not supported`);
      return "ethereum";
  }
}
