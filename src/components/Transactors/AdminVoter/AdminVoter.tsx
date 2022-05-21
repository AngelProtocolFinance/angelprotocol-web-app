import { FormProvider, useForm } from "react-hook-form";
import VoteForm from "./VoteForm";
import { AdminVoteValues, Props } from "./types";

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
      <VoteForm />
    </FormProvider>
  );
}
