import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { CreatePollValues, Props } from "./types";

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
