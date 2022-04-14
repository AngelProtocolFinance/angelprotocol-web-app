import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./schema";
import { HaloStakingValues, Props } from "./types";

export default function Staker(props: Props) {
  const methods = useForm<HaloStakingValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      is_stake: !!props.stake,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}
