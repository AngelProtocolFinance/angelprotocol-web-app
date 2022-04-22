import { CreateTxOptions } from "@terra-money/terra.js";
import { useCallback, useEffect, useState } from "react";
import { useSubmitMutation } from "services/aws/registration";
import { useBalances } from "services/terra/queriers";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import Registrar from "contracts/Registrar";
import { RegistrarCreateEndowmentPayload as RegistrarEndowmentCreationPayload } from "contracts/types";
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
  const [isSubmitting, setSubmitting] = useState(false);
  const [newProposalId, setNewProposalId] = useState<string | undefined>();

  useEffect(() => {
    if (stage.step === Step.success) {
      const proposalId = stage
        .txInfo!.logs![0].events.find(
          (event) => event.type == "instantiate_contract"
        )
        ?.attributes.find(
          (attribute) => attribute.key == "contract_address"
        )?.value;

      setNewProposalId(proposalId);
    }
  }, [stage]);

  const submit = useCallback(
    async (charity: CharityData) => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        const payload = createMessagePayload(charity);
        const contract = new Registrar(wallet);
        const msg = contract.createEndowmentCreationMsg(payload);

        setSubmitting(true);
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
        dispatch(sendTerraTx({ wallet, tx: tx! }));

        dispatch(setFormLoading(false));

        showModal(TransactionPrompt, {});
      } catch (err) {
        dispatch(setFormError(processEstimateError(err)));
      } finally {
        setSubmitting(false);
      }
    },
    [UST_balance, wallet, dispatch, showModal]
  );

  return { submit, isSubmitting, newProposalId };
}

function createMessagePayload(
  charity: CharityData
): RegistrarEndowmentCreationPayload {
  return {
    beneficiary: charity.Metadata.TerraWallet,
    cw4_members: [],
    owner: charity.Metadata.TerraWallet,
    guardians_multisig_addr: undefined,
    maturity_height: undefined,
    maturity_time: undefined,
    withdraw_before_maturity: false,
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
      social_media_urls: {
        facebook: undefined,
        linkedin: undefined,
        twitter: undefined,
      },
      annual_revenue: undefined,
      average_annual_budget: undefined,
      charity_navigator_rating: undefined,
      country_city_origin: undefined,
      number_of_employees: undefined,
      registration_number: undefined,
    },
  };
}
