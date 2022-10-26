import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { Token } from "types/aws";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { placeholderChain } from "contexts/WalletContext/constants";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater() {
  const { wallet, isLoading } = useGetWallet();

  if (isLoading) return <Loader />;
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

function Loader() {
  return (
    <div className="grid grid-cols-2 w-full gap-4 justify-self-center">
      <div className="dark:bg-white/30 bg-gray-l2/30 w-full h-16 rounded col-span-2" />
      <div className="dark:bg-white/30 bg-gray-l2/30 w-full h-16 rounded col-span-2" />
      <div className="dark:bg-white/30 bg-gray-l2/30 w-full h-16 rounded" />
      <div className="dark:bg-white/30 bg-gray-l2/30 w-full h-16 rounded" />
    </div>
  );
}
