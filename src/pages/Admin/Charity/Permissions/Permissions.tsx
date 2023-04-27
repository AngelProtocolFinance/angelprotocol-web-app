import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { SettingsPermission } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { ADDRESS_ZERO } from "constants/evm";
import { adminRoutes } from "constants/routes";
import Seo from "../Seo";
import Form from "./Form";
import { FormField, FormValues, UpdateableFormValues, schema } from "./schema";

export default function Permissions() {
  const { settingsController: controller } = useAdminResources<"charity">();
  const initialValues: UpdateableFormValues = {
    accountFees: createField(controller.aumFee, "Changes to account fees"),
    beneficiaries_allowlist: createField(
      controller.whitelistedBeneficiaries,
      "Changes to beneficiaries whitelist"
    ),
    contributors_allowlist: createField(
      controller.whitelistedContributors,
      "Changes to contributors whitelist"
    ),
    donationSplitParams: createField(
      controller.splitToLiquid,
      "Changes to donation split parameters"
    ),
    profile: createField(controller.name, "Changes to profile"),
  };
  const methods = useForm<FormValues>({
    defaultValues: {
      initialValues,
      endowment_controller: createField(controller.endowmentController),
      ...initialValues,
    },
    resolver: yupResolver(schema),
  });

  return (
    <div className="grid gap-6">
      <Seo title="Permissions" url={adminRoutes.permissions} />

      <h2 className="font-bold text-3xl">Permissions</h2>

      <FormProvider {...methods}>
        <Form />
      </FormProvider>
    </div>
  );
}

function createField(settings: SettingsPermission, name = ""): FormField {
  const isDelegated = settings.delegate.Addr !== ADDRESS_ZERO;
  return {
    name,
    govControlled: settings.govControlled,
    modifiableAfterInit: settings.modifiableAfterInit,
    ownerControlled: settings.ownerControlled,
    delegated: isDelegated,
    delegate_address: isDelegated ? settings.delegate.Addr : "",
  };
}
