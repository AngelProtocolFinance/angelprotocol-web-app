import { yupResolver } from "@hookform/resolvers/yup";
import { mumbai, polygon } from "constants/chains";
import { IS_TEST } from "constants/env";
import { FormProvider, useForm } from "react-hook-form";
import { CryptoFormStep } from "slices/donation";
import { DonaterConfigFromWidget } from "types/widget";
import Form from "./Form";
import { initToken } from "./constants";
import { schema } from "./schema";
import { DonateValues } from "./types";

type Props = CryptoFormStep & {
  config: DonaterConfigFromWidget | null;
};

export default function Crypto({ config, ...state }: Props) {
  const initial: DonateValues = {
    source: config ? "bg-widget" : "bg-marketplace",
    token: initToken,
    chainId: IS_TEST
      ? { label: mumbai.name, value: mumbai.id }
      : { label: polygon.name, value: polygon.id },
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
