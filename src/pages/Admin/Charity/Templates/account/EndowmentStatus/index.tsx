import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import { isEthereumAddress } from "schemas/tests";
import Form from "./Form";
import { schema } from "./schema";

export default function EndowmentStatus() {
  const { wallet } = useGetWallet();
  const { status } = useAdminResources<"charity">();

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      status: {
        value: status,
        label: status,
      },
      beneficiary: {
        type: "wallet",
        id: wallet && isEthereumAddress(wallet.address) ? wallet.address : "",
      },
      prevStatus: status,
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
