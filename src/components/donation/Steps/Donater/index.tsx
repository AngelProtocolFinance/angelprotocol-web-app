import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { DonaterConfigFromWidget } from "types/widget";
import { FormStep } from "slices/donation";
import { polygon } from "constant/chains";
import Form from "./Form";
import { initToken } from "./constants";
import { schema } from "./schema";

type Props = FormStep & {
  config: DonaterConfigFromWidget | null;
};

export default function Donater({ config, ...state }: Props) {
  const initial: DonateValues = {
    token: initToken,
    pctLiquidSplit: config?.liquidSplitPct ?? 50,
    chainId: { label: polygon.name, value: polygon.id },
    userOptForKYC: false,
  };

  const methods = useForm<DonateValues>({
    values: state.details || initial,
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form configFromWidget={config} />
    </FormProvider>
  );
}
