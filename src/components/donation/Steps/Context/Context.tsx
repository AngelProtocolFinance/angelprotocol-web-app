import { logger } from "helpers";
import { sendTx } from "helpers/tx";
import {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import {
  invalidateApesTags,
  useConfirmCryptoIntentMutation,
} from "services/apes";
import { invalidateAwsTags } from "services/aws/aws";
import { useSetter } from "store/accessors";
import { type TxPackage, isTxResultError } from "types/tx";
import type { CryptoSubmitStep, DonationState, TxStatus } from "../types";

type CryptoSubmitter = (
  txPackage: TxPackage,
  data: CryptoSubmitStep
) => Promise<void>;

type State = {
  state: DonationState;
  setState: Dispatch<React.SetStateAction<DonationState>>;
  submitCrypto: CryptoSubmitter;
};

const INIT = "__INIT";
const context = createContext<State>(INIT as any);
export default function Context({
  children,
  ...initState
}: PropsWithChildren<DonationState>) {
  const dispatch = useSetter();
  const [confirmIntent] = useConfirmCryptoIntentMutation();
  const [state, setState] = useState<DonationState>(initState);

  const submitCrypto: CryptoSubmitter = async (
    txPackage: TxPackage,
    data: CryptoSubmitStep
  ) => {
    const updateTx = (status: TxStatus) =>
      setState({ ...data, step: "tx", status });

    try {
      const result = await sendTx(txPackage);

      if (isTxResultError(result)) {
        return updateTx("error");
      }
      const { hash } = result;

      updateTx({
        loadingMsg: "Saving donation details",
      });

      const { guestDonor } = await confirmIntent({
        txHash: hash,
        txId: data.intentId,
      }).unwrap();

      updateTx({ hash, guestDonor });
      //invalidate cache entries
      dispatch(invalidateApesTags(["tokens"]));
      dispatch(invalidateAwsTags(["donations"]));
    } catch (err) {
      logger.error(err);
      updateTx("error");
    }
  };

  return (
    <context.Provider value={{ state, setState, submitCrypto }}>
      {children}
    </context.Provider>
  );
}

export function useDonationState(): State {
  const val: any = useContext(context);
  if (val === INIT) {
    throw "useDonationStateState can only be used in components inside Donation context";
  }

  return val;
}
