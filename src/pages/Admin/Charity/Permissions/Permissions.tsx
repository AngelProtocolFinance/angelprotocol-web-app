import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Delegate } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { ADDRESS_ZERO } from "constants/evm";
import { adminRoutes } from "constants/routes";
import Seo from "../Seo";
import Form from "./Form";
import { controllerUpdate } from "./helpers";
import { FormField, FormValues, UpdateableFormValues, schema } from "./schema";

export default function Permissions() {
  const { settingsController: controller, id } = useAdminResources<"charity">();

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

function createField(delegate: Delegate, name = ""): FormField {
  const isDelegated = delegate.addr !== ADDRESS_ZERO;
  return {
    name,
    isActive: isDelegated,
    addr: isDelegated ? delegate.addr : "",
    ownerControlled: true,
    govControlled: false,
    modifiableAfterInit: true,
  };
}
