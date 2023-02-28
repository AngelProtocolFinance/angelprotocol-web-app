import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FV } from "./types";
import { TManagement } from "slices/launchpad/types";
import { useGetWallet } from "contexts/WalletContext";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

type Props = {
  data: TManagement | undefined;
};

const Management: FC<Props> = ({ data }) => {
  const { wallet } = useGetWallet();

  const methods = useForm<FV>({
    defaultValues: data
      ? data
      : {
          members: wallet?.address ? [{ addr: wallet.address, weight: 1 }] : [],
          proposal: {
            threshold: 50,
            duration: 48,
            isAutoExecute: true,
          },
        },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
};

export default withStepGuard<2>(Management);
