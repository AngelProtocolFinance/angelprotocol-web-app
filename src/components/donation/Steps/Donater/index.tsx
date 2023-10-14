import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { TokenWithAmount } from "types/tx";
import { WithWallet } from "types/wallet";
import { DonaterConfigFromWidget } from "types/widget";
import { FormStep } from "slices/donation";
import { polygon } from "constants/chains-v2";
import Form from "./Form";
import { schema } from "./schema";

type Props = WithWallet<FormStep> & {
  config: DonaterConfigFromWidget | null;
};

const initToken: TokenWithAmount = {
  approved: false,
  decimals: 6,
  logo: "",
  min_donation_amnt: 0,
  name: "",
  symbol: "",
  token_id: "",
  coingecko_denom: "",
  type: "erc20",
  balance: 0,
  amount: "0",
};

export default function Donater({ wallet, config, ...state }: Props) {
  const initial: DonateValues = {
    token: initToken,
    pctLiquidSplit: config?.liquidSplitPct ?? 50,
    chainId: { label: polygon.name, value: polygon.id },
    userOptForKYC: false,
  };

  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    values: state.details || initial,
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form configFromWidget={config} wallet={wallet} />
    </FormProvider>
  );
}
