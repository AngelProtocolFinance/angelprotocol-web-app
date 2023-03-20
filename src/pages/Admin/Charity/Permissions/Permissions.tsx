import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { EndowmentController, SettingsPermissions } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useEndowmentControllerQuery } from "services/juno/settingsController";
import QueryLoader from "components/QueryLoader";
import Form from "./Form";
import { FormField, FormValues, UpdateableFormValues, schema } from "./schema";

export default function Permissions() {
  const { id } = useAdminResources();
  const queryState = useEndowmentControllerQuery({ id });

  return (
    <div className="grid gap-6">
      <h2 className="font-bold text-3xl">Permissions</h2>

      <QueryLoader
        queryState={queryState}
        messages={{
          error: "Failed to get permissions.",
          loading: "Loading permissions...",
        }}
      >
        {(endowmentController) => (
          <InnerComponent controller={endowmentController} />
        )}
      </QueryLoader>
    </div>
  );
}

function InnerComponent({ controller }: { controller: EndowmentController }) {
  const initialValues: UpdateableFormValues = {
    accountFees: createField(controller.aum_fee, "Changes to account fees"),
    beneficiaries_allowlist: createField(
      controller.beneficiaries_allowlist,
      "Changes to beneficiaries whitelist"
    ),
    contributors_allowlist: createField(
      controller.contributors_allowlist,
      "Changes to contributors whitelist"
    ),
    donationSplitParams: createField(
      controller.split_to_liquid,
      "Changes to donation split parameters"
    ),
    profile: createField(controller.name, "Changes to profile"),
  };
  const methods = useForm<FormValues>({
    defaultValues: {
      initialValues,
      endowment_controller: createField(controller.endowment_controller),
      ...initialValues,
    },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

function createField(settings: SettingsPermissions, name = ""): FormField {
  const result: FormField = {
    name,
    gov_controlled: settings.gov_controlled,
    modifiable: settings.modifiable,
    owner_controlled: settings.owner_controlled,
    ...(!settings.delegate
      ? { delegate: false, delegate_address: "" }
      : { delegate: true, delegate_address: settings.delegate.address }),
  };

  return result;
}
