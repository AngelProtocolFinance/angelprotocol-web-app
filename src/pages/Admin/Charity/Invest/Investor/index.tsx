import { useForm } from "react-hook-form";
import { FormValues } from "./types";
import { EndowmentAsset } from "services/types";
import { TokenWithAmount } from "types/slices";
import { WalletState } from "contexts/WalletContext";

type Props = {
  wallet: WalletState;
  asset: EndowmentAsset;
};
export default function Investor({ wallet }: Props) {
  const token: TokenWithAmount[] = wallet.coins.map((t) => ({
    ...t,
    amount: "0",
  }));

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: _tokens[0],
      pctLiquidSplit: "0",

      //meta
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
