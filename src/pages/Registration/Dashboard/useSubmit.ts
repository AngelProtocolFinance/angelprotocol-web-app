import { CreateTxOptions } from "@terra-money/terra.js";
import { useCallback, useEffect } from "react";
import { useSubmitMutation } from "services/aws/registration";
import { Charity } from "services/aws/types";
import { useBalances } from "services/terra/queriers";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import {
  setFee,
  setFormError,
  setFormLoading,
  setStage,
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

const FORM_ERROR =
  "An error occured. Please try again and if the error persists after two failed attempts, please contact support@angelprotocol.io";

export default function useSubmit() {
  const [submitToAws] = useSubmitMutation();

  const { stage, form_loading } = useGetter((state) => state.transaction);
  const charity = useGetter((state) => state.charity);
  const { wallet } = useWalletContext();
  const { showModal } = useSetModal();
  const dispatch = useSetter();
  const { main: UST_balance } = useBalances(denoms.uusd);

  useEffect(() => {
    async function handleSuccess() {
      try {
        console.log(stage);

        const endowmentContract = stage
          .txInfo!.logs![0].events.find(
            (event) => event.type === "instantiate_contract"
          )!
          .attributes.find((attr) => attr.key === "contract_address")!.value;

        await submitToAws({ PK: charity.ContactPerson.PK!, endowmentContract });

        dispatch(setFormLoading(false));
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(setStage({ step: Step.error, message: FORM_ERROR }));
        dispatch(setFormLoading(false));
      }
    }

    if (stage.step === Step.error) {
      console.log(stage.message);
      dispatch(setFormError(FORM_ERROR)); // also sets form_loading to 'false'
    } else if (stage.step === Step.success) {
      handleSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, dispatch, submitToAws]);

  const submit = useCallback(
    async (charity: Charity) => {
      try {
        if (!wallet) {
          dispatch(
            setStage({ step: Step.error, message: "Wallet is not connected" })
          );
          return;
        }

        const payload = createMessagePayload(charity);
        const contract = new Registrar(wallet);
        const msg = contract.createEndowmentCreationMsg(payload);

        dispatch(setFormLoading(true));

        const fee = await contract.estimateFee([msg]);
        const feeNum = extractFeeNum(fee);

        //2nd balance check including fees
        if (feeNum >= UST_balance) {
          dispatch(
            setStage({
              step: Step.error,
              message: "Not enough UST to pay fees",
            })
          );
          dispatch(setFormLoading(false));
          return;
        }

        dispatch(setFee(feeNum));

        const tx: CreateTxOptions = { msgs: [msg], fee };
        dispatch(sendTerraTx({ wallet, tx: tx! }));
      } catch (err) {
        console.log(processEstimateError(err));
        dispatch(setStage({ step: Step.error, message: FORM_ERROR }));
        dispatch(setFormLoading(false));
      } finally {
        showModal(TransactionPrompt, {});
      }
    },
    [UST_balance, wallet, dispatch, showModal]
  );

  return { submit, isSubmitting: form_loading };
}

function createMessagePayload(
  charity: Charity
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
