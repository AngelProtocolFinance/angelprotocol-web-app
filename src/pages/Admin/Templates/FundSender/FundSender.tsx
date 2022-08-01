import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FundSendValues } from "pages/Admin/types";
import { denoms } from "constants/currency";
// import { useGetter } from "store/accessors";
import FundSendForm from "./FundSendForm/FundSendForm";
import { fundSendSchema } from "./fundSendSchema";

export default function FundSender() {
  // const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  // const cw3address =
  //   cwContracts === "apTeam" ? contracts.apCW3 : cwContracts.cw3;

  const methods = useForm<FundSendValues>({
    resolver: yupResolver(fundSendSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      currency: denoms.axlusdc,
      haloBalance: 0,
      usdBalance: 0,
    },
  });

  return (
    <FormProvider {...methods}>
      <FundSendForm />
    </FormProvider>
  );
}
