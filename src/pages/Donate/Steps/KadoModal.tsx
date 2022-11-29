import { Dialog } from "@headlessui/react";
import { useGetWallet } from "contexts/WalletContext";
import { logger } from "helpers";
import { chainIDs } from "constants/chains";

type KADO_NETWORK_VALUES = "ethereum" | "juno" | "terra";

export default function KadoModal() {
  const { wallet } = useGetWallet();

  const onToAddress = !wallet ? "" : `&onToAddress=${wallet.address}`;
  const network = !wallet
    ? ""
    : `&network=${getKadoNetworkValue(wallet.chain.chain_id)}`;

  return (
    <Dialog.Panel className="fixed-center z-10">
      <iframe
        src={`https://app.kado.money?apiKey=${process.env.REACT_APP_KADO_API_KEY}&onPayCurrency=USD&onRevCurrency=USDC&onPayAmount=100${onToAddress}&cryptoList=USDC&fiatList=USD${network}&product=BUY`}
        className="w-[500px] h-[700px] border-none rounded"
        title="Buy with Kado"
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
