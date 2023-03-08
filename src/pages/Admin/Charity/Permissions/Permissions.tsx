import { FormProvider, useForm } from "react-hook-form";
import { Permission } from "./types";
import QueryLoader from "components/QueryLoader";
import Form from "./Form";
import { FormValues } from "./schema";

const data: Permission[] = [
  {
    id: "1",
    action: "Changes to Admin Wallet members",
    permitted_to: "admin_wallet",
    delegate_address: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc111",
  },
  {
    id: "2",
    action: "Changes to Admin Wallet parameters",
    permitted_to: "delegate",
    delegate_address: "juno1k7jkmvzkrr3rv4htqvmh63f0fmvm89dfpqc111",
  },
];

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
          empty: "No permissions found.",
          error: "Failed to get permissions.",
          loading: "Loading permissions...",
        }}
      >
        {(permissions) => <InnerComponent permissions={permissions} />}
      </QueryLoader>
    </div>
  );
}

function InnerComponent({ permissions }: { permissions: Permission[] }) {
  const methods = useForm<FormValues>({ defaultValues: { permissions } });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
