import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { TokenWithAmount } from "types/slices";
import { useBalancesQuery } from "services/apes";
import { WithCosmosWallet } from "contexts/WalletContext";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { FormStep } from "slices/gift";
import Form from "./Form";
import { schema } from "./schema";

export default function Purchaser({
  classes = "",
  wallet,
  ...state
}: WithCosmosWallet<FormStep> & { classes?: string }) {
  const { chainId, address, id } = wallet;
  const {
    data: tokens = [],
    isLoading,
    isError,
  } = useBalancesQuery({
    address,
    chainId,
    providerId: id,
  });

  if (isLoading) {
    return (
      <LoadingStatus classes="justify-self-center">
        Fetching balances...
      </LoadingStatus>
    );
  }

  if (isError) {
    return (
      <ErrorStatus classes="justify-self-center">
        Failed to fetch balances
      </ErrorStatus>
    );
  }

  return (
    <Context
      chainId={wallet.chainId}
      state={state}
      tokens={tokens.map((t) => ({ ...t, amount: "0" }))}
    />
  );
}

type Props = {
  chainId: string;
  tokens: TokenWithAmount[];
  state: FormStep;
};

function Context({ tokens, state, chainId }: Props) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state.details || {
      token: tokens[0],
      recipient: "",

      //meta
      tokens: tokens,
      chainId: chainId,
    },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
