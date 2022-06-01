import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundSendValues } from "pages/Admin/types";
import { useGetter } from "store/accessors";
import FundSendForm from "./FundSendForm/FundSendForm";
import { fundSendSchema } from "./fundSendSchema";

export default function FundSender() {
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  // const cw3address =
  //   cwContracts === "apTeam" ? contracts.apCW3 : cwContracts.cw3;

  return <FundSendContext {...{ haloBalance: 0, ustBalance: 0 }} />;
}

function FundSendContext(props: { haloBalance: number; ustBalance: number }) {
  const methods = useForm<FundSendValues>({
    resolver: yupResolver(fundSendSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      currency: "uusd",
      haloBalance: props.haloBalance,
      ustBalance: props.ustBalance,
    },
  });

  return (
    <FormProvider {...methods}>
      <FundSendForm />
    </FormProvider>
  );
}
