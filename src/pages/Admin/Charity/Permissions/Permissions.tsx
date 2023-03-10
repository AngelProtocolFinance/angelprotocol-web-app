import { FormProvider, useForm } from "react-hook-form";
import { UpdateEndowmentControllerMsg } from "./types";
import QueryLoader from "components/QueryLoader";
import Form from "./Form";
import { FormValues } from "./schema";

const data: UpdateEndowmentControllerMsg = {} as UpdateEndowmentControllerMsg;

export default function Permissions() {
  return (
    <div className="grid gap-6">
      <h2 className="font-bold text-3xl">Permissions</h2>

      <QueryLoader
        queryState={{
          isLoading: false,
          isError: false,
          data,
        }}
        messages={{
          error: "Failed to get permissions.",
          loading: "Loading permissions...",
        }}
      >
        {(permissions) => <InnerComponent data={permissions} />}
      </QueryLoader>
    </div>
  );
}

function InnerComponent({ data }: { data: UpdateEndowmentControllerMsg }) {
  const methods = useForm<FormValues>({
    defaultValues: {
      accountFees: {
        name: "Changes to account fees",
        modifiable: true,
        gov_controlled: false,
        owner_controlled: true,
        delegate: false,
      },
      beneficiaries_allowlist: {
        name: "Changes to beneficiaries whitelist",
        modifiable: true,
        gov_controlled: true,
        owner_controlled: true,
        delegate: false,
      },
      contributors_allowlist: {
        name: "Changes to contributors whitelist",
        modifiable: true,
        gov_controlled: false,
        owner_controlled: false,
        delegate: true,
        delegate_address: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc6y5",
      },
      donationSplitParams: {
        name: "Changes to donation split parameters",
        modifiable: true,
        gov_controlled: false,
        owner_controlled: true,
        delegate: false,
      },
      liquidAccountStrategy: {
        name: "Liquid account investment strategy",
        modifiable: true,
        gov_controlled: false,
        owner_controlled: true,
        delegate: false,
      },
      lockedAccountStrategy: {
        name: "Locked account investment strategy",
        modifiable: true,
        gov_controlled: false,
        owner_controlled: true,
        delegate: false,
      },
      profile: {
        name: "Changes to profile",
        modifiable: true,
        gov_controlled: false,
        owner_controlled: true,
        delegate: false,
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
