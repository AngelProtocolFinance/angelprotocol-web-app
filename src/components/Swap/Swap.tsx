// import { useEffect, useState } from "react";

import { MdOutlineClose } from "react-icons/md";
import { useSetModal } from "components/Nodal/Nodal";
import { useForm } from "react-hook-form";
import { useGetter } from "store/accessors";
import { Wallets } from "services/wallet/types";
import SwapForm from "./SwapForm";
import SwapHeader from "./SwapHeader";
import { currency_text, denoms } from "constants/currency";
import { useState } from "react";
import { useWallet } from "@terra-money/wallet-provider";

export enum Key {
  fromAsset = "fromAsset",
  toAsset = "toAsset",
  fromAmount = "fromAmount",
  fromUSDAmount = "fromUSDAmount",
  toUSDAmount = "toUSDAmount",
  fromBalance = "fromBalance",
  toBalance = "toBalance",
  toAmount = "toAmount",
  feeValue = "feeValue",
  feeSymbol = "feeSymbol",
  load = "load",
  fromAssetSymbol = "fromAssetSymbol",
  toAssetSymbol = "toAssetSymbol",
  fromMin = "fromMin",
  fromMax = "fromMax",
  toMax = "toMax",
  maxFee = "maxFee",
  gasPrice = "gasPrice",
  taxCap = "taxCap",
  taxRate = "taxRate",
  poolLoading = "poolLoading",
}

export default function Swap() {
  // connect modal
  // useContractAddress hook to get symbol & native tokens
  // hook to interact with apis
  // const { post: terraExtensionPost } = useWallet();
  // settings modal to change swap settings
  // slippage hook (localstorage)

  const form = useForm({
    defaultValues: {
      [Key.fromAmount]: "",
      [Key.toAmount]: "",
      [Key.fromAsset]: denoms.uluna,
      [Key.toAsset]: denoms.uusd,
      [Key.feeValue]: "",
      [Key.feeSymbol]: currency_text[denoms.uusd],
      [Key.load]: "",
      [Key.fromAssetSymbol]: "",
      [Key.toAssetSymbol]: "",
      [Key.fromMax]: "",
      [Key.toMax]: "",
      [Key.maxFee]: "",
      [Key.gasPrice]: "",
      [Key.poolLoading]: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });
  const { register, watch, setValue, setFocus, formState, trigger } = form;
  const [isReversed, setIsReversed] = useState(false);

  const formData = watch();
  return (
    <div className="w-128 p-10 min-h-3/4">
      <SwapHeader />
      <SwapForm register={register} form={form}></SwapForm>
    </div>
  );
}

export const SwapWrapper = (props: { inModal: true }) => {
  const { hideModal } = useSetModal();

  return (
    <div
      className={`max-w-md w-full relative ${
        props.inModal ? "rounded-md" : ""
      }`}
    >
      {props.inModal && (
        <button
          onClick={hideModal}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <MdOutlineClose size={30} />
        </button>
      )}
      <Swap />
    </div>
  );
};

export const SwapModal = () => {
  return <SwapWrapper inModal />;
};
