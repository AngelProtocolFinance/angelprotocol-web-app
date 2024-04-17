import { chains } from "constants/chains";
import { useErrorContext } from "contexts/ErrorContext";
import { useEffect, useState } from "react";
import { useCreateCryptoIntentMutation } from "services/apes";
import { CryptoSubmitStep } from "slices/donation";
import { CryptoDonation } from "types/aws";
import { ConnectedWallet } from "types/wallet";

export default function useCreateCryptoIntent(
  donation: CryptoSubmitStep,
  wallet?: ConnectedWallet
) {
  const [transactionId, setTransactionId] = useState<string>();

  const [createCryptoIntent] = useCreateCryptoIntentMutation();
  const { handleError } = useErrorContext();

  const { details, recipient, liquidSplitPct, tip = 0, donor } = donation;

  const chain = chains[details.chainId.value];

  useEffect(() => {
    (async () => {
      try {
        if (!wallet?.address) {
          return;
        }

        const payload: CryptoDonation = {
          amount: +details.token.amount,
          tipAmount: tip,
          chainId: chain.id,
          chainName: chain.name,
          denomination: details.token.symbol,
          splitLiq: liquidSplitPct,
          walletAddress: wallet.address,
          endowmentId: recipient.id,
          source: details.source,
          donor,
        };
        const id = await createCryptoIntent(payload).unwrap();
        setTransactionId(id);
      } catch (err) {
        handleError(err);
      }
    })();
  }, [
    details.token.amount,
    details.token.symbol,
    details.source,
    recipient.id,
    liquidSplitPct,
    chain.id,
    chain.name,
    tip,
    donor,
    wallet?.address,
    createCryptoIntent,
    handleError,
  ]);

  return transactionId;
}
