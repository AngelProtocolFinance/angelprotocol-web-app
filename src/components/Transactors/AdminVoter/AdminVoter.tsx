import { FormProvider, useForm } from "react-hook-form";
import { Values, Props } from "./types";

export default function Voter(props: Props) {
  const methods = useForm<Values>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      vote: "yes",
      proposal_id: props.proposal_id,
    },
  });
  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
