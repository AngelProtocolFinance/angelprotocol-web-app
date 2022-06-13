import { yupResolver } from "@hookform/resolvers/yup";
<<<<<<< HEAD
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "components/Transactors/Donater/types";
import { createUSTToken } from "components/WalletSuite/useWalletUpdator";
import DonateForm from "./DonateForm/DonateForm";
=======
import { DonateValues } from "components/Transactors/Donater/types";
import { MAIN_DENOM } from "constants/currency";
import { FormProvider, useForm } from "react-hook-form";
>>>>>>> master
import { schema } from "./schema";
import { Props } from "./types";

export default function Donater(props: Props) {
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      split_liq: `${props.min_liq || 0}`,
      //metadata
<<<<<<< HEAD
      token: createUSTToken(0),
=======
      currency: MAIN_DENOM,
>>>>>>> master
      min_liq: props.min_liq || 0,
      max_liq: props.max_liq || (props.max_liq === 0 ? 0 : 100),
      to: props.to,
      receiver: props.receiver,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <DonateForm />
    </FormProvider>
  );
}
