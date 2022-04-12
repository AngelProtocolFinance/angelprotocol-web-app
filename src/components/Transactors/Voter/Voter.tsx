import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./schema";
import { Props, VoteValues } from "./types";

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
      <props.Form />
    </FormProvider>
  );
}
