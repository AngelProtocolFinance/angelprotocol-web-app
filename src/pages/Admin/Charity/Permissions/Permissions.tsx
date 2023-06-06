import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { SettingsPermission } from "types/contracts";
import { ADDRESS_ZERO } from "constants/evm";
import { adminRoutes } from "constants/routes";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";
import Form from "./Form";
import { controllerUpdate } from "./helpers";
import { FormField, FormValues, UpdateableFormValues, schema } from "./schema";

export default function Permissions() {
  const { settingsController: controller, id } = useAdminContext<"charity">();

  const fv: UpdateableFormValues = {
    accountFees: createField(controller.depositFee, "Changes to account fees"),
    beneficiaries_allowlist: createField(
      controller.allowlistedBeneficiaries,
      "Changes to beneficiaries whitelist"
    ),
    contributors_allowlist: createField(
      controller.allowlistedContributors,
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
      initial: controllerUpdate(id, fv, controller),
      ...fv,
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

function createField(setting: SettingsPermission, name = ""): FormField {
  const delegate = setting.delegate;
  const isDelegated = delegate.addr !== ADDRESS_ZERO;
  return {
    isActive: isDelegated,
    addr: isDelegated ? delegate.addr : "",
    locked: setting.locked,

    //meta
    name,
    modifiable: !setting.locked,
    ownerControlled: true,
    govControlled: false,
  };
}
