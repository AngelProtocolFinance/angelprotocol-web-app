import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { Token } from "types/aws";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { placeholderChain } from "contexts/WalletContext/constants";
import ContentLoader from "components/ContentLoader";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater() {
  const { wallet, isLoading } = useGetWallet();

  if (isLoading) return <DonateFormLoader />;
  return <Context tokens={wallet?.coins} />;
}

function Context(props: { tokens: Token[] | undefined }) {
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      token: { ...(props.tokens || placeholderChain.tokens)[0], amount: "" },
    },
    resolver: yupResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

function DonateFormLoader() {
  return (
    <div className="bg-white grid p-4 rounded-md w-full">
      <ContentLoader className="opacity-30 h-12 w-full" />
      <ContentLoader className="opacity-30 h-30 mt-4 w-full" />
      <ContentLoader className="opacity-30 h-10 mt-4 w-full" />
    </div>
  );
}
