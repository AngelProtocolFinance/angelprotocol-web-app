import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Values, Props } from "./types";

export default function Voter(props: Props) {
  const methods = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      vote: "yes",
      poll_id: props.poll_id,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
