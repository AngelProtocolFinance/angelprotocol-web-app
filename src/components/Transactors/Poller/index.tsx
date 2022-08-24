import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { CreatePollValues, Props } from "./types";
import { schema } from "./schema";

export default function Poller(props: Props) {
  const methods = useForm<CreatePollValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: (10_000).toString(),
    },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <props.Form />
    </FormProvider>
  );
}

/** TODO: fetch resources at top level and do checks on schema level
 * const haloBalance = wallet.getBalance(denoms.halo);
        if (amount >= haloBalance) {
          setError("amount", { message: "not enough balance" });
          return;
        }
 * 
 */
