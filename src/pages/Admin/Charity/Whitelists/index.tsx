import { FormProvider, useForm } from "react-hook-form";
import { FV } from "./types";
import { useLaunchpad } from "slices/launchpad";
import Form from "./Form";

export default function Whitelists() {
  const { update } = useLaunchpad(3);
  const methods = useForm<FV>({
    defaultValues: { contributors: [], beneficiaries: [] },
  });

  const { handleSubmit } = methods;
  return (
    <>
      <h2 className="text-[2rem] font-bold mb-10">Whitelists</h2>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit((data) => update(data))} />
      </FormProvider>
    </>
  );
}
