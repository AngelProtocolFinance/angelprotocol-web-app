import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { CreatePollValues, Props } from "@types-component/poller";
import { schema } from "./schema";

export default function Poller(props: Props) {
  const methods = useForm<CreatePollValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: (10_000).toString(),
    },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
