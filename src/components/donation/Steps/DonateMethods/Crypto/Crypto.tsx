import { yupResolver } from "@hookform/resolvers/yup";
import { polygon, polygonAmoy } from "constants/chains";
import { IS_TEST } from "constants/env";
import { FormProvider, useForm } from "react-hook-form";
import { schema, tokenShape } from "schemas/shape";
import { object } from "yup";
import type { CryptoFormStep } from "../../types";
import Form from "./Form";
import { initToken } from "./constants";
import type { DonateValues } from "./types";

type Props = CryptoFormStep;
export default function Crypto(props: Props) {
  const initial: DonateValues = {
    source: props.config ? "bg-widget" : "bg-marketplace",
    token: initToken,
    chainId: IS_TEST
      ? { label: polygonAmoy.name, value: polygonAmoy.id }
      : { label: polygon.name, value: polygon.id },
  };

  const methods = useForm<DonateValues>({
    values: props.details || initial,
    resolver: yupResolver(
      schema<DonateValues>({
        token: object(tokenShape()),
        //no need to validate split, restricted by slider
      })
    ),
  });
  return (
    <FormProvider {...methods}>
      <Form source={props.config ? "bg-widget" : "bg-marketplace"} />
    </FormProvider>
  );
}
