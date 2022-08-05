import { FormProvider, useForm } from "react-hook-form";
import { Props, VoteValues } from "./types";
import Form from "./Form";

export default function Voter(props: Props) {
  const methods = useForm<VoteValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      vote: "yes",
      proposalId: props.proposalId,
    },
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
