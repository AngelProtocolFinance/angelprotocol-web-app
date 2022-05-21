import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { requiredTokenAmount } from "schemas/number";
import VoterForm from "./VoterForm";
import { Props, VoteValues } from "./types";

const schema = Yup.object().shape({
  amount: requiredTokenAmount,
});

export default function Voter(props: Props) {
  const methods = useForm<VoteValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      vote: "yes",
      poll_id: `${props.poll_id}`,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <VoterForm />
    </FormProvider>
  );
}
