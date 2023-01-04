import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { TokenWithAmount } from "types/slices";
import { useBalancesQuery } from "services/apes";
import { WithWallet } from "contexts/WalletContext";
import { Tooltip } from "components/donation";
import { FormStep } from "slices/donation";
import { Chain, chains } from "constants/chains";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater({ wallet, ...state }: WithWallet<FormStep>) {
  const { chainId, address } = wallet;
  const chain = chains[chainId];
  const { data: tokens = [], isLoading } = useBalancesQuery({
    address,
    chainId,
  });

  if (isLoading) {
    return <Tooltip type="Loading" message="Fetching balances.." />;
  }

  return (
    <Context
      chain={chain}
      state={state}
      tokens={tokens.map((t) => ({ ...t, amount: "0" }))}
    />
  );
}

type Props = {
  chain: Chain;
  tokens: TokenWithAmount[];
  state: FormStep;
};

function Context({ tokens, state, chain }: Props) {
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: tokens[0],
      pctLiquidSplit: "0",

      //meta
      tokens,
      chain,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
