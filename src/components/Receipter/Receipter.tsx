import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { Values } from "./types";
import { useGetter } from "store/accessors";
import { useConnectedWallet } from "@terra-money/wallet-provider";

export default function Receipter(props: any) {
  const { stage } = useGetter((state) => state.transaction);
  const wallet = useConnectedWallet();

  const methods = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues: {
      amount: parseInt(stage.content?.tx?.amount || ""),
      transactionDate: new Date().toISOString(),
      transactionId: stage.content?.tx?.txHash,
      chainId: wallet?.network.chainID,
      fullName: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      denomination: "UST",
    },
    resolver: yupResolver(schema),
  });
  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
