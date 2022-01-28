import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Values, Props } from "./types";

export default function Poller(props: Props) {
  const methods = useForm<Values>({
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
