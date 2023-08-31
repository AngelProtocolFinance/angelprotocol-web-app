import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { useGetWallet } from "contexts/WalletContext";
import { isEthereumAddress } from "schemas/tests";
import { useAdminContext } from "../../../../Context";
import Form from "./Form";
import { schema } from "./schema";

export default function CloseEndowment() {
  const { wallet } = useGetWallet();
  const { endowType } = useAdminContext<"charity">();

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      beneficiaryType: "wallet",
      beneficiaryWallet:
        wallet && isEthereumAddress(wallet.address) ? wallet.address : "",
      beneficiaryEndowmentId: 0,
      meta: { endowType },
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
