import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { object } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { isConnected, useWalletContext } from "contexts/WalletContext";
import { useLaunchpad } from "slices/launchpad";
import { requiredPercent, requiredPositiveNumber } from "schemas/number";
import { isJunoAddress } from "schemas/tests";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

export default withStepGuard<2>(function Management({ data }) {
  const { update } = useLaunchpad(2);
  const wallet = useWalletContext();

  const methods = useForm<FV>({
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        proposal: object().shape<SchemaShape<FV["proposal"]>>({
          duration: requiredPositiveNumber,
          threshold: requiredPercent,
        }),
      })
    ),
    defaultValues: data || {
      members:
        isConnected(wallet) && isJunoAddress(wallet.address)
          ? [{ addr: wallet.address, weight: "1" }]
          : [],

      proposal: {
        duration: "",
        threshold: "",
        isAutoExecute: true,
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
