import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useEffect } from "react";
import { useSubmitMutation } from "services/aws/registration";
import { Charity, SubmitResult } from "services/aws/types";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import {
  setFormError,
  setFormLoading,
  setStage,
} from "services/transaction/transactionSlice";
import { Stage, Step } from "services/transaction/types";
import { WalletProxy } from "providers/WalletProvider";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import Registrar from "contracts/Registrar";
import { RegistrarCreateEndowmentPayload as RegistrarEndowmentCreationPayload } from "contracts/types";
import useWalletContext from "hooks/useWalletContext";
import processEstimateError from "helpers/processEstimateError";
import { updateCharity } from "../store";

const FORM_ERROR =
  "An error occured. Please try again and if the error persists after two failed attempts, please contact support@angelprotocol.io";

export default function useSubmit() {
  const [submitToAws] = useSubmitMutation();

  const { stage, form_loading } = useGetter((state) => state.transaction);
  const charity = useGetter((state) => state.charity);
  const { wallet } = useWalletContext();
  const { showModal } = useModalContext();
  const dispatch = useSetter();

  const handleError = useCallback(
    (err) => {
      console.log(err);
      showModal(Popup, { message: FORM_ERROR });
    },
    [showModal]
  );

  const handleSuccess = useCallback(
    (data: SubmitResult) =>
      dispatch(
        updateCharity({
          ...charity,
          Registration: {
            ...charity.Registration,
            RegistrationStatus: data.RegistrationStatus,
          },
          Metadata: {
            ...charity.Metadata,
            EndowmentContract: data.EndowmentContract,
          },
        })
      ),
    [dispatch, charity]
  );

  const handleResult = useCallback(
    (
      result:
        | { data: SubmitResult }
        | { error: FetchBaseQueryError | SerializedError }
    ) => {
      const dataResult = result as {
        data: SubmitResult;
        error: FetchBaseQueryError | SerializedError;
      };

      if (dataResult.error) {
        handleError(dataResult.error);
      } else {
        handleSuccess(dataResult.data);
      }
    },
    [handleError, handleSuccess]
  );

  useEffect(() => {
    async function handle() {
      try {
        const result = await submitToAws({
          PK: charity.ContactPerson.PK!,
          EndowmentContract: getEndowmentContract(stage),
        });

        handleResult(result);
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(setStage({ step: Step.error, message: FORM_ERROR }));
      } finally {
        dispatch(setFormLoading(false));
      }
    }

    if (stage.step === Step.error) {
      console.log(stage.message);
      dispatch(setFormError(FORM_ERROR)); // also sets form_loading to 'false'
    } else if (stage.step === Step.success) {
      handle();
    }
  }, [charity.ContactPerson.PK, stage, dispatch, submitToAws, handleResult]);

  const submit = useCallback(
    async (charity: Charity) => {
      try {
        if (!wallet) {
          dispatch(
            setStage({ step: Step.error, message: "Wallet is not connected" })
          );
          return;
        }

        dispatch(setFormLoading(true));

        const msg = createEndowmentCreationMsg(charity, wallet);

        dispatch(sendTerraTx({ wallet, msgs: [msg] }));
      } catch (err) {
        console.log(processEstimateError(err));
        dispatch(setStage({ step: Step.error, message: FORM_ERROR }));
        dispatch(setFormLoading(false));
      } finally {
        showModal(TransactionPrompt, {});
      }
    },
    [wallet, dispatch, showModal]
  );

  return { submit, isSubmitting: form_loading };
}

function createEndowmentCreationMsg(charity: Charity, wallet?: WalletProxy) {
  const payload = createMessagePayload(charity);
  const contract = new Registrar(wallet);
  return contract.createEndowmentCreationMsg(payload);
}

function createMessagePayload(
  charity: Charity
): RegistrarEndowmentCreationPayload {
  return {
    beneficiary: charity.Metadata.TerraWallet,
    cw4_members: [],
    guardians_multisig_addr: undefined,
    maturity_height: undefined,
    maturity_time: undefined,
    owner: charity.Metadata.TerraWallet,
    profile: {
      annual_revenue: undefined,
      average_annual_budget: undefined,
      charity_navigator_rating: undefined,
      contact_email: charity.ContactPerson.Email,
      country_of_origin: undefined,
      endow_type: "Charity",
      image: charity.Metadata.Banner.publicUrl!,
      logo: charity.Metadata.CharityLogo.publicUrl!,
      name: charity.Registration.CharityName,
      number_of_employees: undefined,
      overview: charity.Metadata.CharityOverview,
      registration_number: undefined,
      social_media_urls: {
        facebook: undefined,
        linkedin: undefined,
        twitter: undefined,
      },
      street_address: undefined,
      tier: charity.Registration.Tier!,
      un_sdg: charity.Registration.UN_SDG,
      url: charity.Registration.Website,
    },
    withdraw_before_maturity: false,
  };
}

function getEndowmentContract(stage: Stage) {
  return stage
    .txInfo!.logs![0].events.find(
      (event) => event.type === "instantiate_contract"
    )!
    .attributes.find((attr) => attr.key === "contract_address")!.value;
}
