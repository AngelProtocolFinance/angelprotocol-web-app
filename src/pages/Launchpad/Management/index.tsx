import { FormProvider, useForm } from "react-hook-form";
import { FV } from "./types";
import { useGetWallet } from "contexts/WalletContext";
import { useLaunchpad } from "slices/launchpad";
import { isEthereumAddress } from "schemas/tests";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

export default withStepGuard<2>(function Management({ data }) {
  const { update } = useLaunchpad(2);
  const { wallet } = useGetWallet();

  const methods = useForm<FV>({
    defaultValues: data || {
      members:
        wallet?.address && isEthereumAddress(wallet.address)
          ? [wallet.address]
          : [],

      proposal: {
        threshold: 1,
        isAutoExecute: true,
        duration: "1",
      },
    },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit((data) => update(data))} />
    </FormProvider>
  );
});
