import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { AccountBalances, FormValues, InvestorProps } from "./types";
import { TokenWithAmount } from "types/tx";
import { isTooltip, useAdminContext } from "pages/Admin/Context";
import { useEndowBalanceQuery } from "services/juno/custom";
import { condenseToNum } from "helpers";
import Form from "./Form";
import { schema } from "./schema";

export default function Investor({ endowId, strategy }: InvestorProps) {
  const { txResource } = useAdminContext([
    "liquidInvestmentManagement",
    "lockedInvestmentManagement",
  ]);
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
      <Form
        {...strategy}
        accountBalances={accountBalances}
        error={isTooltip(txResource) ? txResource : undefined}
      />
    </FormProvider>
  );
}
