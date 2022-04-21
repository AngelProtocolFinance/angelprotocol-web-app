import { CreateTxOptions, MsgExecuteContract } from "@terra-money/terra.js";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSubmitMutation } from "services/aws/registration";
import { Registration } from "services/aws/types";
import { useBalances } from "services/terra/queriers";
import { admin, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import Registrar from "contracts/Registrar";
import useWalletContext from "hooks/useWalletContext";
import extractFeeNum from "helpers/extractFeeNum";
import processEstimateError from "helpers/processEstimateError";
import { denoms } from "constants/currency";
import { CharityData } from "../store";

export default function useSubmit() {
  const [submitToAws] = useSubmitMutation();

  const { stage } = useGetter((state) => state.transaction);
  const { wallet } = useWalletContext();
  const { showModal } = useSetModal();
  const dispatch = useSetter();
  const { main: UST_balance } = useBalances(denoms.uusd);
  const [isLoading, setLoading] = useState(false);

  const submit = useCallback(
    async (charity: CharityData) => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        const contract = new Registrar(wallet);
        const msg = contract.createCreateEndowmentMsg({
          beneficiary: charity.Metadata.TerraWallet,
          cw4_members: [],
          owner: charity.Metadata.TerraWallet,
          profile: {
            contact_email: charity.ContactPerson.Email,
            endow_type: "Charity",
            name: charity.Registration.CharityName,
            overview: charity.Metadata.CharityOverview,
            un_sdg: charity.Registration.UN_SDG,
            tier: charity.Registration.Tier!,
            logo: charity.Metadata.CharityLogo.sourceUrl!,
            image: charity.Metadata.Banner.sourceUrl!,
            url: charity.Registration.Website,
            social_media_urls: {},
          },
        });

        setLoading(true);
        dispatch(setFormLoading(true));

        const fee = await contract.estimateFee([msg]);
        const feeNum = extractFeeNum(fee);

        //2nd balance check including fees
        if (feeNum >= UST_balance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee(feeNum));
        const tx: CreateTxOptions = { msgs: [msg], fee };
        dispatch(setFormLoading(false));
        dispatch(
          sendTerraTx({
            wallet,
            tx: tx!,
            tagPayloads: [
              terra.util.invalidateTags([
                { type: tags.admin, id: admin.proposal },
              ]),
            ],
          })
        );
        showModal(TransactionPrompt, {});
      } catch (err) {
        dispatch(setFormError(processEstimateError(err)));
      } finally {
        setLoading(false);
      }
    },
    [UST_balance, wallet, dispatch, showModal]
  );

  return { submit, isLoading };
}
