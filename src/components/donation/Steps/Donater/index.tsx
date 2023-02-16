import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { TokenWithAmount } from "types/slices";
import { useBalancesQuery } from "services/apes";
import { WithWallet } from "contexts/WalletContext";
import { LoadingStatus } from "components/Status";
import { FormStep } from "slices/donation";
import { isEmpty } from "helpers";
import { Chain, chains } from "constants/chains";
import { ConfigParams } from "..";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater({
  wallet,
  config,
  ...state
}: WithWallet<FormStep> & { config: ConfigParams }) {
  const { chainId, address, id } = wallet;
  const chain = chains[chainId];
  const { data: tokens = [], isLoading } = useBalancesQuery({
    address,
    chainId,
    providerId: id,
  });

  if (isLoading) {
    return (
      <LoadingStatus classes="justify-self-center">
        Fetching balances..
      </LoadingStatus>
    );
  }

  return (
    <Context
      key={chainId}
      chain={chain}
      state={state}
      config={config}
      tokens={tokens.map((t) => ({ ...t, amount: "0" }))}
    />
  );
}

type Props = {
  chain: Chain;
  tokens: TokenWithAmount[];
  state: FormStep;
  config: ConfigParams;
};

function Context({ tokens, state, chain, config }: Props) {
  const {
    availCurrs = [],
    hideAdvOpts = false,
    unfoldAdvOpts = false,
  } = config;

  const native = tokens[0];
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: native,
      pctLiquidSplit: 0,

      //meta
      tokens: isEmpty(availCurrs)
        ? tokens
        : tokens.filter(
            (token) =>
              availCurrs.includes(token.symbol) ||
              token.symbol === native.symbol
          ),
      chain,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form hideAdvOpts={hideAdvOpts} unfoldAdvOpts={unfoldAdvOpts} />
    </FormProvider>
  );
}
