import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { AccountBalances, FormValues } from "./types";
import { AWSstrategy } from "types/aws";
import { TokenWithAmount } from "types/tx";
import { useEndowBalanceQuery } from "services/juno/custom";
import { condenseToNum } from "helpers";
import Form from "./Form";
import { schema } from "./schema";

type Props = AWSstrategy & { endowId: number };
export default function Investor({ endowId, ...strategy }: Props) {
  const { data } = useEndowBalanceQuery({
    id: endowId,
  });

  const accountBalances: AccountBalances = ((data) => {
    if (!data) return { liquid: 0, locked: 0 };
    //endowBalance only outputs aUSDC for now
    const liquidToken = data.liquid[0];
    const lockedToken = data.locked[0];
    return {
      liquid: condenseToNum(liquidToken.amount),
      locked: condenseToNum(lockedToken.amount),
    };
  })(data);

  const token: TokenWithAmount = {
    approved: true,
    decimals: 6,
    logo: "", //not used
    min_donation_amnt: 0.01,
    name: "", //not used
    symbol: "aUSDC",
    token_id: "uusd",
    type: "erc20",
    amount: "0",
    balance: accountBalances.liquid,
    coingecko_denom: "",
  };

  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      type: "liquid",
      lockPeriod: "1",
      token,
      tokens: [token],
      //meta
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form {...strategy} accountBalances={accountBalances} />
    </FormProvider>
  );
}
