import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { schema, tokenShape } from "schemas/shape";
import { object, string } from "yup";
import { DEFAULT_PROGRAM, initTokenOption } from "../../common/constants";
import type { CryptoFormStep } from "../../types";
import Form from "./Form";
import type { DonateValues } from "./types";

type Props = CryptoFormStep;
export default function Crypto(props: Props) {
  const initial: DonateValues = {
    program: DEFAULT_PROGRAM,
    token: initTokenOption,
    chainId: "",
  };

  const methods = useForm<DonateValues>({
    values: props.details || initial,
    resolver: yupResolver(
      schema<DonateValues>({
        token: object(tokenShape()),
        chainId: string().required("Please select network"),
        //no need to validate split, restricted by slider
      })
    ),
  });
  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  );
}
