import { Coin } from "@cosmjs/proto-signing";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { CW20 } from "types/server/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";

export default function useWithdraw() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { cw3, endowment } = useAdminResources();
  const { wallet } = useGetWallet();
  const { proposalLink } = useAdminResources();
  const dispatch = useSetter();

  function withdraw(data: WithdrawValues) {
    //TODO: handle ETH/BNB,

    //filter + map
    const [cw20s, natives] = data.amounts.reduce(
      (result, amount) => {
        if (amount.type == "cw20") {
          result[0].push({ address: amount.tokenId, amount: "1000" });
        } else {
          result[1].push({ denom: amount.tokenId, amount: "498000" });
        }
        return result;
      },
      [[], []] as [CW20[], Coin[]]
    );

    const account = new Account(wallet, endowment);
    const msg = account.createEmbeddedWithdrawLiqMsg({
      beneficiary: data.beneficiary,
      assets: {
        cw20: [], //cw20s are placeholder TODO:remove placeholder
        native: natives,
      },
    });

    const cw3contract = new CW3(wallet, cw3);
    //proposal meta for preview
    const proposal = cw3contract.createProposalMsg(
      "withdraw proposal",
      `withdraw from endowment: ${endowment}`,
      [msg]
    );
    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposal],
        tagPayloads: [
          invalidateJunoTags([
            /**TODO: invalidate balance query */
          ]),
        ],
        successLink: proposalLink,
        successMessage: "Withdraw proposal successfully created!",
      })
    );
  }

  return {
    withdraw: handleSubmit(withdraw),
    isSubmitDisabled:
      !isValid ||
      !isDirty ||
      form_loading ||
      form_error !== null ||
      isSubmitting,
    isFormLoading: form_loading,
  };
}
