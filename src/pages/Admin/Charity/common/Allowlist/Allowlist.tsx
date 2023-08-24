import { FormProvider, useForm } from "react-hook-form";
import { FormValues as FV, Props } from "./types";
import Form from "./Form";

export default function Allowlist(props: Props) {
  const { initial } = props;
  const methods = useForm<FV>({
    defaultValues: {
      initial,
      addresses: initial,
    },
  });
  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  );
}
