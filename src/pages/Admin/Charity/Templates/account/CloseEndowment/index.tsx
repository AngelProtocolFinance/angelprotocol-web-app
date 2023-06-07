import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { useGetWallet } from "contexts/WalletContext";
import { isEthereumAddress } from "schemas/tests";
import Form from "./Form";
import { schema } from "./schema";

export default function CloseEndowment() {
  const { wallet } = useGetWallet();

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      beneficiary: {
        type: "wallet",
        id: wallet && isEthereumAddress(wallet.address) ? wallet.address : "",
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
