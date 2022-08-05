import { FormProvider, useForm } from "react-hook-form";
import { AdminVoteValues, Props } from "./types";
import Form from "./Form";

export default function Voter(props: Props) {
  const methods = useForm<AdminVoteValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      vote: "yes",
      proposal_id: props.proposal_id,
    },
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
