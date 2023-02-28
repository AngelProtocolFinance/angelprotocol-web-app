import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { TManagement } from "slices/launchpad/types";
import { useGetWallet } from "contexts/WalletContext";
import { useLaunchpad } from "slices/launchpad";
import { requiredPercentString, requiredPositiveNumber } from "schemas/number";
import { isJunoAddress } from "schemas/tests";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

type Props = {
  data: TManagement | undefined;
};

const Management: FC<Props> = ({ data }) => {
  const { update } = useLaunchpad(2);
  const { wallet } = useGetWallet();

  const methods = useForm<FV>({
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        //no need to validate members, already validated in AddForm
        duration: requiredPositiveNumber,
        threshold: requiredPercentString,
      })
    ),
    defaultValues: data
      ? {
          members: data.members,
          duration: `${data.proposal.duration}`,
          threshold: `${data.proposal.threshold}`,
          isAutoExecute: data.proposal.isAutoExecute,
        }
      : {
          members:
            wallet?.address && isJunoAddress(wallet.address)
              ? [{ addr: wallet.address, weight: 1 }]
              : [],
          duration: "",
          threshold: "",
          isAutoExecute: true,
        },
  });

  const { handleSubmit } = methods;
  const submit: SubmitHandler<FV> = (data) => {
    update({
      members: data.members,
      proposal: {
        duration: Number(data.duration),
        threshold: Number(data.threshold),
        isAutoExecute: data.isAutoExecute,
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(submit)} />
    </FormProvider>
  );
};

export default withStepGuard<2>(Management);
