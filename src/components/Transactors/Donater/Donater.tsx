import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { DonateValues, DonaterProps } from "./types";
import { SchemaShape } from "schemas/types";
import { Token } from "types/aws";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { placeholderChain } from "contexts/WalletContext/constants";
import ContentLoader from "components/ContentLoader";
import { requiredTokenAmount } from "schemas/number";
import DonateForm from "./DonateForm/DonateForm";

const shape: SchemaShape<DonateValues> = {
  amount: requiredTokenAmount,
  isAgreedToTerms: Yup.boolean().isTrue(),
};
const schema = Yup.object().shape(shape);

export default function Donater(
  props: DonaterProps /** set by opener context */
) {
  const { wallet, isLoading } = useGetWallet();

  if (isLoading) return <DonateFormLoader />;
  return <DonateContext {...props} tokens={wallet?.coins} />;
}

function DonateContext(props: DonaterProps & { tokens: Token[] | undefined }) {
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      split_liq: `${props.min_liq || 0}`,
      //metadata
      token: (props.tokens || placeholderChain.tokens)[0],
      min_liq: props.min_liq || 0,
      max_liq: props.max_liq || (props.max_liq === 0 ? 0 : 100),
      charityId: props.charityId,
      kycData: props.kycData,
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
