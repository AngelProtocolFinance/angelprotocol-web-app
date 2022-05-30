import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { placeHolderToken } from "services/apes/tokens/constants";
import ContentLoader from "components/ContentLoader";
import { requiredTokenAmount } from "schemas/number";
import { SchemaShape } from "schemas/types";
import DonateForm from "./DonateForm/DonateForm";
import { DonateValues, FundFlow } from "./types";

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
      <DonateFormLoader />
    </FormProvider>
  );
}

function DonateFormLoader() {
  return (
    <div className="bg-white-grey grid p-4 rounded-md w-full">
      <ContentLoader className="opacity-30 h-10 w-full" />
      <ContentLoader className="opacity-30 h-24 mt-4 w-full" />
    </div>
  );
}
