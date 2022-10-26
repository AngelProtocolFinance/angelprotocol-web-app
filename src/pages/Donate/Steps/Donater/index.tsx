import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { DonateValues } from "./types";
import { Token } from "types/aws";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { placeholderChain } from "contexts/WalletContext/constants";
import Icon from "components/Icon";
import { Step1 } from "slices/donation";
import Form from "./Form";
import { schema } from "./schema";

export default function Donater(props: Step1) {
  const { wallet, isLoading } = useGetWallet();

  if (isLoading) return <Loader />;

  if (!wallet) {
    return (
      <p className="text-center">
        <Icon
          size={20}
          type="Info"
          className="relative inline bottom-[1px] mr-2"
        />
        You need to connect your wallet do make a donation
      </p>
    );
  }

  return <Context tokens={wallet.coins} state={props} />;
}

function Context(props: { tokens: Token[]; state: Step1 }) {
  const methods = useForm<DonateValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: props.state.details || {
      token: { ...(props.tokens[0] || placeholderChain.tokens[0]), amount: "" },
      pctLiquidSplit: "0",
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
      <div className="dark:bg-white/10 bg-gray-l2/30 w-full h-16 rounded col-span-2" />
      <div className="dark:bg-white/10 bg-gray-l2/30 w-full h-16 rounded col-span-2" />
      <div className="dark:bg-white/10 bg-gray-l2/30 w-full h-16 rounded" />
      <div className="dark:bg-white/10 bg-gray-l2/30 w-full h-16 rounded" />
    </div>
  );
}
