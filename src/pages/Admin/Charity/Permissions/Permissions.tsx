import { FormProvider, useForm } from "react-hook-form";
import { EndowmentController, SettingsPermissions } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useEndowmentControllerQuery } from "services/juno/settingsController";
import QueryLoader from "components/QueryLoader";
import Form from "./Form";
import { FormField, FormValues } from "./schema";

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
  const methods = useForm<FormValues>({
    defaultValues: {
      accountFees: createField("Changes to account fees", controller.aum_fee),
      beneficiaries_allowlist: createField(
        "Changes to beneficiaries whitelist",
        controller.beneficiaries_allowlist
      ),
      contributors_allowlist: createField(
        "Changes to contributors whitelist",
        controller.contributors_allowlist
      ),
      donationSplitParams: createField(
        "Changes to donation split parameters",
        controller.split_to_liquid
      ),
      profile: createField("Changes to profile", controller.name),
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

function createField(name: string, settings: SettingsPermissions): FormField {
  const result: FormField = {
    name,
    gov_controlled: settings.gov_controlled,
    modifiable: settings.modifiable,
    owner_controlled: settings.owner_controlled,
    ...(!settings.delegate
      ? { delegate: false, delegate_address: undefined }
      : { delegate: true, delegate_address: settings.delegate.address }),
  };

  return result;
}
