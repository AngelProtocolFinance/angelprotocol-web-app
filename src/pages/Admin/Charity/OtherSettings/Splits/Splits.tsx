import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FV } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import Form from "./Form";

export default function Splits() {
  const { splitToLiquid, ignoreUserSplits } = useAdminResources<"charity">();
  const methods = useForm<FV>({
    defaultValues: {
      isCustom: !ignoreUserSplits,
      //set max diff so user see how UI is used
      min: splitToLiquid.min.toString(),
      max: splitToLiquid.max.toString(),

      default: splitToLiquid.defaultSplit.toString(),
      defaultMin: "0",
    },
  });

  const { handleSubmit } = methods;

  const update: SubmitHandler<FV> = async () => {};

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit((data) => update(data))} />
    </FormProvider>
  );
}
