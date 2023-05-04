import { FormProvider, useForm } from "react-hook-form";
import { FV } from "./types";
import { useLaunchpad } from "slices/launchpad";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

export default withStepGuard<5>(function Splits({ data }) {
  const { update } = useLaunchpad(5);

  const methods = useForm<FV>({
    defaultValues: data
      ? { ...data, defaultMin: "0" }
      : {
          isCustom: false,
          //set max diff so user see how UI is used
          min: "0",
          max: "100",

          default: "50",
          defaultMin: "0",
        },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit((data) => update(data))} />
    </FormProvider>
  );
});
