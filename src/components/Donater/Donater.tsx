import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Props } from "./types";
import { schema } from "./schema";
import { denoms } from "constants/currency";
// import Nodal from "components/Nodal/Nodal";

export default function Donater(props: Props) {
  const maxLiq = props.maxSplitLiq;
  const minLocked = 100 - (maxLiq === undefined ? 50 : maxLiq);
  const methods = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      split: minLocked,
      currency: denoms.uusd,
      loading: false,
      error: "",
      fee: 0,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      {/* <Nodal classes="fixed bg-black bg-opacity-50 top-0 bottom-0 right-0 left-0 grid place-items-center"> */}
      {props.children}
      {/* </Nodal> */}
    </FormProvider>
  );
}
