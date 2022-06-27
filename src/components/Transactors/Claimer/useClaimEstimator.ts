import { useEffect, useState } from "react";
import { SigningCosmWasmClient, Tx } from "types/third-party/cosmjs";
import { useGovStaker } from "services/juno/gov/queriers";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Gov from "contracts/Gov";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { getCosmosClient, getFee, getFeeNum } from "helpers/third-party/cosmjs";
import { denoms } from "constants/currency";

let client: SigningCosmWasmClient;
export default function useClaimEstimator() {
  const [tx, setTx] = useState<Tx>();
  const dispatch = useSetter();
  const { wallet } = useGetWallet();
  const gov_staker = useGovStaker();

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        if ((gov_staker?.claims || []).length <= 0) {
          dispatch(setFormError("No recent unstaked tokens"));
          return;
        }

        const hasClaim = !!gov_staker.claims?.find(
          (claim) => +claim.release_at.at_time <= Date.now() * 1e6
        );

        if (!hasClaim) {
          dispatch(setFormError("No claimable tokens at the moment"));
          return;
        }

        dispatch(setFormLoading(true));
        if (!client) client = await getCosmosClient();
        const contract = new Gov(wallet.address);
        const claimMsg = contract.createGovClaimMsg();
        const gas = await client.simulate(
          wallet.address,
          [claimMsg],
          undefined
        );
        const fee = getFee(gas);
        const feeNum = getFeeNum(fee);

        const ustBalance = getTokenBalance(wallet.coins, denoms.uusd);
        //2nd balance check including fees
        if (feeNum >= ustBalance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee(feeNum));
        setTx({ msgs: [claimMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError(processEstimateError(err)));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };

    //eslint-disable-next-line
  }, [wallet, gov_staker]);

  return { tx, wallet };
}
