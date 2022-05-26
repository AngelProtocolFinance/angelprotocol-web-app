import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { DonateValues, FundFlow } from "./types";
import { SchemaShape } from "schemas/types";
import { placeHolderToken } from "contexts/WalletContext/constants";
import { requiredTokenAmount } from "schemas/number";
import { denomIcons, denoms } from "constants/currency";
import DonateForm from "./DonateForm/DonateForm";

const shape: SchemaShape<DonateValues> = {
  amount: requiredTokenAmount,
};
const schema = Yup.object().shape(shape);

export default function Donater(props: FundFlow) {
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      split_liq: `${props.min_liq || 0}`,
      //metadata
      token: placeHolderToken,
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

// const createUSTToken = (balance: number) => ({
//   balance,
//   min_denom: denoms.uusd,
//   symbol: "UST",
//   decimals: 6,
//   logo: denomIcons.uusd,
// });
