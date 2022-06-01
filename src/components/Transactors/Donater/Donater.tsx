import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { DonateValues, FundFlow } from "./types";
import { SchemaShape } from "schemas/types";
import { TokenWithBalance } from "services/types";
import { placeHolderToken } from "services/apes/tokens/constants";
import { useBalancesQuery } from "services/apes/tokens/tokens";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import ContentLoader from "components/ContentLoader";
import { requiredTokenAmount } from "schemas/number";
import DonateForm from "./DonateForm/DonateForm";

const shape: SchemaShape<DonateValues> = {
  amount: requiredTokenAmount,
};
const schema = Yup.object().shape(shape);

export default function Donater(props: FundFlow) {
  const { chainId, walletAddr } = useGetWallet();
  const { data = [], isLoading } = useBalancesQuery(
    { chainId, address: walletAddr },
    { skip: !chainId && !walletAddr }
  );

  if (isLoading) return <DonateFormLoader />;
  return <DonateContext {...props} tokens={data} />;
}

function DonateContext(props: FundFlow & { tokens: TokenWithBalance[] }) {
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      split_liq: `${props.min_liq || 0}`,
      //metadata
      token: props.tokens[0] || placeHolderToken,
      tokens: props.tokens,
      min_liq: props.min_liq || 0,
      max_liq: props.max_liq || (props.max_liq === 0 ? 0 : 100),
      to: props.to,
      receiver: props.receiver,
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <DonateForm />
    </FormProvider>
  );
}

function DonateFormLoader() {
  return (
    <div className="bg-white-grey grid p-4 rounded-md w-full">
      <ContentLoader className="opacity-30 h-12 w-full" />
      <ContentLoader className="opacity-30 h-30 mt-4 w-full" />
      <ContentLoader className="opacity-30 h-10 mt-4 w-full" />
    </div>
  );
}
