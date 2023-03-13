import { useFormContext } from "react-hook-form";
import { ProposalMeta } from "pages/Admin/types";
import {
  SettingsPermissions,
  UpdateEndowmentControllerMsg,
} from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import CW3 from "contracts/CW3";
import SettingsController from "contracts/SettingsController";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { isEmpty } from "helpers";
import { getPayloadDiff } from "helpers/admin";
import { FormField, FormValues } from "./schema";

export default function useSubmit() {
  const { id, cw3, propMeta } = useAdminResources();
  const { handleError } = useErrorContext();
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useFormContext<FormValues>();
  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();

  async function onSubmit({ initialValues, ...newValues }: FormValues) {
    try {
      const diff = getPayloadDiff(initialValues, newValues);

      if (isEmpty(Object.entries(diff))) {
        return handleError("No changes detected");
      }

      return console.log(diff);

      const settingsController = new SettingsController(wallet);
      const msg = createUpdateEndowmentControllerMsg(id, newValues);
      const embeddedMsg =
        settingsController.createEmbeddedUpdateEndowmentControllerMsg(msg);

      const meta: ProposalMeta = { type: "endow_controller" };

      const adminContract = new CW3(wallet, cw3);
      const proposalMsg = adminContract.createProposalMsg(
        "Update permission settings",
        `Update permission settings for endowment id:${id}`,
        [embeddedMsg],
        JSON.stringify(meta)
      );

      await sendTx({
        msgs: [proposalMsg],
        ...propMeta,
      });
    } catch (error) {
      handleError(error);
    }
  }

  return { isSubmitting, reset, submit: handleSubmit(onSubmit) };
}

function createUpdateEndowmentControllerMsg(
  endowId: number,
  formValues: Omit<FormValues, "initialValues">
): UpdateEndowmentControllerMsg {
  const accountFees = createField(formValues.accountFees);
  const beneficiaries_allowlist = createField(formValues.accountFees);
  const donationSplitParams = createField(formValues.donationSplitParams);
  const profile = createField(formValues.profile);
  const contributors_allowlist = createField(formValues.contributors_allowlist);

  const updateMsg: UpdateEndowmentControllerMsg = {
    id: endowId,
    aum_fee: accountFees,
    beneficiaries_allowlist,
    categories: profile,
    contributors_allowlist,
    deposit_fee: accountFees,
    earnings_fee: accountFees,
    ignore_user_splits: donationSplitParams,
    image: profile,
    kyc_donors_only: profile,
    logo: profile,
    maturity_allowlist: beneficiaries_allowlist,
    name: profile,
    split_to_liquid: donationSplitParams,
    withdraw_fee: accountFees,
  };
  return updateMsg;
}

function createField(formField: FormField): SettingsPermissions {
  const result: SettingsPermissions = {
    gov_controlled: formField.gov_controlled,
    modifiable: formField.modifiable,
    owner_controlled: formField.owner_controlled,
  };

  if (formField.delegate) {
    result.delegate = { address: formField.delegate_address };
  }

  return result;
}
