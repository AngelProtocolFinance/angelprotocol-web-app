import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Props, VoteValues } from "./types";
import Form from "./Form";
import { schema } from "./schema";

export default function Voter(props: Props) {
  const methods = useForm<VoteValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      vote: "yes",
      proposalId: props.proposalId,
      type: props.type,
    },
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
