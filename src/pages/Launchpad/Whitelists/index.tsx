import { FormProvider, useForm } from "react-hook-form";
import { FV } from "./types";
import { TWhitelists } from "slices/launchpad/types";
import { useLaunchpad } from "slices/launchpad";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

type Props = {
  data: TWhitelists | undefined;
};

function Whitelists({ data }: Props) {
  const { update } = useLaunchpad(3);
  const methods = useForm<FV>({
    defaultValues: data || { contributors: [], beneficiaries: [] },
  });

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit((data) => update(data))} />
    </FormProvider>
  );
}

export default withStepGuard<3>(Whitelists);
